import { createFileRoute } from "@tanstack/react-router";
import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import { chatRequestSchema, isValidConversationSize } from "@/lib/startbd-chat-contract";
import { createStartBDChatStream, getSafeChatError } from "@/lib/startbd-chat.server";

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

        const stream = createUIMessageStream({
          execute: async ({ writer }) => {
            writer.write({ type: "start" });
            writer.write({ type: "text-start", id: "bdai-answer" });

            try {
              const response = await createStartBDChatStream(parsed.data.messages, request.signal);
              let hasText = false;
              for await (const event of response) {
                if (event.type === "response.output_text.delta" || event.type === "response.refusal.delta") {
                  hasText = true;
                  writer.write({ type: "text-delta", id: "bdai-answer", delta: event.delta });
                }
              }

              if (!hasText) {
                writer.write({
                  type: "text-delta",
                  id: "bdai-answer",
                  delta: "I couldn’t find a clear answer in the startBD catalog. Try asking about a service or roadmap phase.",
                });
              }
              writer.write({ type: "text-end", id: "bdai-answer" });
              writer.write({ type: "finish", finishReason: "stop" });
              writer.setOutcome({ status: "completed" });
            } catch (error) {
              writer.write({ type: "text-end", id: "bdai-answer" });
              writer.write({ type: "error", errorText: getSafeChatError(error) });
              writer.setOutcome({ status: request.signal.aborted ? "aborted" : "failed", error });
            }
          },
          onError: getSafeChatError,
        });

        return createUIMessageStreamResponse({
          stream,
          headers: { "Cache-Control": "no-store" },
        });
      },
    },
  },
});