import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { UIMessage } from "ai";

export type StartBDLanguage = "en" | "bn";

export type ChatThread = {
  id: string;
  title: string;
  messages: UIMessage[];
  initialQuestion: string | undefined;
};

type StartBDChatSessionValue = {
  language: StartBDLanguage;
  setLanguage: (language: StartBDLanguage) => void;
  threads: ChatThread[];
  createThread: (initialQuestion?: string) => string;
  ensureThread: (id: string) => void;
  setThreadMessages: (id: string, messages: UIMessage[]) => void;
};

const StartBDChatSessionContext = createContext<StartBDChatSessionValue | null>(null);

export function StartBDChatSessionProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<StartBDLanguage>("en");
  const [threads, setThreads] = useState<ChatThread[]>([]);

  const createThread = useCallback((initialQuestion?: string) => {
    const id = crypto.randomUUID();
    setThreads((current) => [{
      id,
      title: initialQuestion ? initialQuestion.slice(0, 48) : "New conversation",
      messages: [],
      initialQuestion,
    }, ...current]);
    return id;
  }, []);

  const ensureThread = useCallback((id: string) => {
    setThreads((current) =>
      current.some((thread) => thread.id === id)
        ? current
        : [{ id, title: "New conversation", messages: [], initialQuestion: undefined }, ...current],
    );
  }, []);

  const setThreadMessages = useCallback((id: string, messages: UIMessage[]) => {
    const firstQuestion = messages.find((message) => message.role === "user")?.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(" ")
      .trim();
    const title = firstQuestion
      ? firstQuestion.length > 48
        ? `${firstQuestion.slice(0, 47)}…`
        : firstQuestion
      : "New conversation";

    setThreads((current) => {
      if (!current.some((thread) => thread.id === id)) {
        return [{ id, title, messages, initialQuestion: undefined }, ...current];
      }
      return current.map((thread) =>
        thread.id === id ? { ...thread, title, messages, initialQuestion: undefined } : thread,
      );
    });
  }, []);

  const value = useMemo(
    () => ({ language, setLanguage, threads, createThread, ensureThread, setThreadMessages }),
    [language, threads, createThread, ensureThread, setThreadMessages],
  );

  return (
    <StartBDChatSessionContext.Provider value={value}>
      {children}
    </StartBDChatSessionContext.Provider>
  );
}

export function useStartBDChatSession() {
  const context = useContext(StartBDChatSessionContext);
  if (!context) {
    throw new Error("useStartBDChatSession must be used within StartBDChatSessionProvider");
  }
  return context;
}