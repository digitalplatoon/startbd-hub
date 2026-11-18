import { useCallback, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { ArrowLeft, ArrowRight, Languages, MessageSquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { useStartBDChatSession } from "@/lib/startbd-chat-session";

type StartBDChatProps = { threadId: string };

const transport = new DefaultChatTransport({ api: "/api/chat" });

export function StartBDChat({ threadId }: StartBDChatProps) {
  const { language, setLanguage, threads, createThread, ensureThread, setThreadMessages } = useStartBDChatSession();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const initialPromptSent = useRef(false);
  const isBangla = language === "bn";
  const thread = threads.find((item) => item.id === threadId);
  const initialQuestion = thread?.initialQuestion;
  const initialMessages = thread?.messages ?? [];
  const finishHandler = useCallback(
    (event: { messages: UIMessage[] }) => setThreadMessages(threadId, event.messages),
    [setThreadMessages, threadId],
  );
  const chat = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
    onFinish: finishHandler,
  });
  const status = chat.status;

  useEffect(() => {
    ensureThread(threadId);
  }, [ensureThread, threadId]);

  useEffect(() => {
    if (chat.messages.length > 0) setThreadMessages(threadId, chat.messages);
  }, [chat.messages, setThreadMessages, threadId]);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (status === "ready") textareaRef.current?.focus();
  }, [status]);

  useEffect(() => {
    if (initialQuestion && !initialPromptSent.current) {
      initialPromptSent.current = true;
      void chat.sendMessage({ text: initialQuestion });
    }
  }, [chat.sendMessage, initialQuestion]);

  const handleSubmit = useCallback(async ({ text }: { text: string }) => {
    if (!text.trim() || status === "submitted" || status === "streaming") return;
    await chat.sendMessage({ text: text.trim() });
    requestAnimationFrame(() => textareaRef.current?.focus());
  }, [chat.sendMessage, status]);

  const handleNewThread = () => {
    const nextId = createThread();
    void navigate({ to: "/chat/$threadId", params: { threadId: nextId } });
  };

  const errorMessage = useMemo(() => {
    if (!chat.error) return null;
    const fallback = isBangla ? "উত্তরটি সম্পূর্ণ হয়নি। আবার চেষ্টা করুন।" : "The answer did not finish. Please try again.";
    return chat.error.message || fallback;
  }, [chat.error, isBangla]);

  return (
    <main className="startbd-chat-shell">
      <header className="chat-app-header">
        <Link className="chat-brand-lockup" to="/">
          <span className="brand-mark"><span /></span>
          <span className="brand-word">start<span>BD</span><i>.</i></span>
        </Link>
        <div className="chat-header-actions">
          <Button
            aria-label={isBangla ? "Switch to English" : "বাংলায় দেখুন"}
            className="chat-language-button"
            onClick={() => setLanguage(isBangla ? "en" : "bn")}
            variant="ghost"
          >
            <Languages aria-hidden="true" />{isBangla ? "EN" : "বাং"}
          </Button>
          <Link className="chat-back-link" to="/">
            <ArrowLeft aria-hidden="true" />{isBangla ? "ইকোসিস্টেম" : "Ecosystem"}
          </Link>
        </div>
      </header>

      <div className="chat-app-layout">
        <aside aria-label={isBangla ? "কথোপকথনসমূহ" : "Conversations"} className="chat-thread-sidebar">
          <div className="chat-sidebar-top">
            <span className="chat-sidebar-label">{isBangla ? "আপনার কথোপকথন" : "YOUR CONVERSATIONS"}</span>
            <Button aria-label={isBangla ? "নতুন কথোপকথন" : "New conversation"} onClick={handleNewThread} size="icon" variant="outline">
              <MessageSquarePlus aria-hidden="true" />
            </Button>
          </div>
          <Button className="chat-sidebar-new" onClick={handleNewThread} variant="outline">
            <MessageSquarePlus aria-hidden="true" />{isBangla ? "নতুন প্রশ্ন" : "New question"}
          </Button>
          <nav className="chat-thread-list">
            {threads.map((item) => (
              <Link
                aria-current={item.id === threadId ? "page" : undefined}
                className={item.id === threadId ? "chat-thread-link is-active" : "chat-thread-link"}
                key={item.id}
                params={{ threadId: item.id }}
                to="/chat/$threadId"
              >
                <span className="thread-link-icon"><MessageSquarePlus aria-hidden="true" /></span>
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
          <p className="chat-session-note">{isBangla ? "এই ট্যাবের সেশন শেষ হলে কথোপকথন মুছে যাবে।" : "Conversations clear when this browser session ends."}</p>
        </aside>

        <section aria-label={isBangla ? "BDai প্রশ্নোত্তর" : "BDai questions and answers"} className="chat-workspace">
          <div className="chat-workspace-heading">
            <div className="chat-agent-lockup">
              <span className="chat-agent-mark"><span>BD</span></span>
              <span><strong>BDai</strong><small>{isBangla ? "স্টার্টবিড ইকোসিস্টেম গাইড" : "startBD ecosystem guide"}</small></span>
            </div>
            <span className="chat-language-badge"><span className="live-dot" />{isBangla ? "বাংলা · বাংলিশ · English" : "Bangla · Banglish · English"}</span>
          </div>

          <Conversation className="chat-conversation" aria-label={isBangla ? "বার্তা" : "Messages"}>
            <ConversationContent className="chat-conversation-content">
              {chat.messages.length === 0 ? (
                <ConversationEmptyState className="chat-empty-state" title={isBangla ? "স্টার্টবিড সম্পর্কে কী জানতে চান?" : "What would you like to know about startBD?"} description={isBangla ? "সেবা, রোডম্যাপ বা আপনার প্রয়োজন নিয়ে প্রশ্ন করুন।" : "Ask about services, the roadmap, or what fits your needs."}>
                  <div className="chat-empty-inner">
                    <span className="chat-agent-mark chat-agent-mark-large"><span>BD</span></span>
                    <div><h1>{isBangla ? "আপনার স্থানীয় গাইড" : "A guide to what’s being built"}</h1><p>{isBangla ? "সেবা, রোডম্যাপ বা আপনার প্রয়োজন নিয়ে প্রশ্ন করুন।" : "Ask about services, the roadmap, or what fits your needs."}</p></div>
                    <div className="chat-quick-prompts">
                      {(isBangla ? ["startBD কী?", "প্রথম ধাপে কী আসবে?"] : ["What is startBD?", "What’s planned for Phase 1?"]).map((question) => (
                        <Button key={question} onClick={() => void chat.sendMessage({ text: question })} variant="outline">{question}<ArrowRight aria-hidden="true" /></Button>
                      ))}
                    </div>
                  </div>
                </ConversationEmptyState>
              ) : chat.messages.map((message) => {
                const text = message.parts.filter((part) => part.type === "text").map((part) => part.text).join("\n");
                return (
                  <Message from={message.role} key={message.id} className="chat-message-row">
                    {message.role === "assistant" && <span className="chat-message-agent-mark">BD</span>}
                    <div className="chat-message-body">
                      <span className="chat-message-role">{message.role === "assistant" ? "BDai" : (isBangla ? "আপনি" : "You")}</span>
                      <MessageContent className="chat-message-content"><MessageResponse>{text}</MessageResponse></MessageContent>
                    </div>
                  </Message>
                );
              })}
              {status === "submitted" && <div className="chat-thinking"><span className="chat-message-agent-mark">BD</span><Shimmer className="chat-thinking-copy">{isBangla ? "আপনার প্রশ্নের প্রেক্ষাপট খুঁজছি…" : "Checking the startBD guide…"}</Shimmer></div>}
              {errorMessage && <p className="chat-error-message" role="alert">{errorMessage}</p>}
            </ConversationContent>
            <ConversationScrollButton aria-label={isBangla ? "সর্বশেষ বার্তায় যান" : "Scroll to latest message"} />
          </Conversation>

          <div className="chat-composer-area">
            <PromptInput className="chat-prompt-input" onSubmit={handleSubmit}>
              <PromptInputTextarea autoFocus aria-label={isBangla ? "আপনার প্রশ্ন" : "Your question"} placeholder={isBangla ? "বাংলা, বাংলিশ বা ইংরেজিতে লিখুন…" : "Ask in Bangla, Banglish, or English…"} ref={textareaRef} rows={1} />
              <PromptInputFooter className="chat-prompt-footer">
                <span>{isBangla ? "শুধু স্টার্টবিডের তথ্যের ভিত্তিতে উত্তর" : "Answers grounded in the startBD guide"}</span>
                <PromptInputSubmit aria-label={isBangla ? "প্রশ্ন পাঠান" : "Send question"} onStop={() => void chat.stop()} status={status} />
              </PromptInputFooter>
            </PromptInput>
            <p className="chat-disclaimer">{isBangla ? "ভুল হতে পারে—গুরুত্বপূর্ণ তথ্য যাচাই করে নিন।" : "AI answers can be imperfect; verify important details."}</p>
          </div>
        </section>
      </div>
    </main>
  );
}