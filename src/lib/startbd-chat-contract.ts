import { z } from "zod";

const textPartSchema = z.object({ type: z.literal("text"), text: z.string().max(3000) }).passthrough();

export const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      parts: z.array(textPartSchema).max(8),
    }).passthrough(),
  ).min(1).max(20),
});

export type ChatRequestMessage = z.infer<typeof chatRequestSchema>["messages"][number];

export function isValidConversationSize(messages: ChatRequestMessage[]) {
  const totalCharacters = messages.reduce(
    (total, message) => total + message.parts.reduce((sum, part) => sum + part.text.length, 0),
    0,
  );
  const latestMessage = messages.at(-1);
  const latestText = latestMessage?.parts.map((part) => part.text).join("").trim();

  return totalCharacters <= 12000 && latestMessage?.role === "user" && Boolean(latestText);
}