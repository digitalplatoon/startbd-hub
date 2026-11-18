import { createFileRoute } from "@tanstack/react-router";
import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import { chatRequestSchema, isValidConversationSize } from "@/lib/startbd-chat-contract";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let rawBody: unknown;
        try {
          rawBody = await request.json();
        } catch {
          return Response.json({ error: "Invalid request body." }, { status: 400 });
        }

        const parsed = chatRequestSchema.safeParse(rawBody);
        if (!parsed.success || !isValidConversationSize(parsed.data.messages)) {
          return Response.json({ error: "Please send a shorter, valid question." }, { status: 400 });
        }
        const latestQuestion = parsed.data.messages.at(-1)?.parts.map((part) => part.text).join(" ") ?? "";
        const emptyAnswer = /[\u0980-\u09FF]/u.test(latestQuestion)
          ? "startBD-এর তালিকায় এর স্পষ্ট উত্তর পাইনি। কোনো সেবা বা রোডম্যাপের ধাপ নিয়ে জিজ্ঞেস করুন।"
          : "I couldn’t find a clear answer in the startBD guide. Try asking about a service or roadmap phase.";
        const textId = crypto.randomUUID();

        const stream = createUIMessageStream({
          onError: (error) => error instanceof Error ? error.message : "The answer could not be completed.",
          execute: async ({ writer }) => {
            writer.write({ type: "start" });
            writer.write({ type: "text-start", id: textId });

            try {
              const { createStartBDChatStream, getSafeChatError } = await import("@/lib/startbd-chat.server");
              const response = await createStartBDChatStream(parsed.data.messages, request.signal);
              let hasText = false;
              for await (const event of response) {
                if (event.type === "response.output_text.delta" || event.type === "response.refusal.delta") {
                  hasText = true;
                  writer.write({ type: "text-delta", id: textId, delta: event.delta });
                }
              }

              if (!hasText) {
                writer.write({ type: "text-delta", id: textId, delta: emptyAnswer });
              }
              writer.write({ type: "text-end", id: textId });
              writer.write({ type: "finish", finishReason: "stop" });
              writer.setOutcome({ status: "completed" });
            } catch (error) {
              writer.write({ type: "text-end", id: textId });
              if (request.signal.aborted) {
                writer.write({ type: "abort" });
                writer.setOutcome({ status: "aborted" });
              } else {
                const { getSafeChatError } = await import("@/lib/startbd-chat.server");
                writer.write({ type: "error", errorText: getSafeChatError(error) });
                writer.setOutcome({ status: "failed", error });
              }
            }
          },
        });

        return createUIMessageStreamResponse({
          stream,
          headers: { "Cache-Control": "no-store" },
        });
      },
    },
  },
});