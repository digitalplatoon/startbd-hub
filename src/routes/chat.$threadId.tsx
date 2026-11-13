import { createFileRoute } from "@tanstack/react-router";
import { StartBDChat } from "@/components/startbd-chat";

export const Route = createFileRoute("/chat/$threadId")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search.q === "string" ? search.q.slice(0, 500) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Ask BDai — startBD ecosystem guide" },
      { name: "description", content: "Ask questions about startBD services and the roadmap in Bangla, Banglish, or English." },
      { property: "og:title", content: "Ask BDai — startBD ecosystem guide" },
      { property: "og:description", content: "A bilingual guide to startBD services and the roadmap." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatRoute,
});

function ChatRoute() {
  const { threadId } = Route.useParams();
  const { q } = Route.useSearch();
  return <StartBDChat key={threadId} threadId={threadId} initialQuestion={q} />;
}