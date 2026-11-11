import { createFileRoute } from "@tanstack/react-router";
import { StartBDPage } from "@/components/startbd-page";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "startBD — Bangladesh’s AI ecosystem" },
      {
        name: "description",
        content:
          "Discover Bangladesh’s integrated AI ecosystem: BDai, local-first verticals, Bangla tools, and a 12-month roadmap—all connected by One Account.",
      },
      { property: "og:title", content: "startBD — Bangladesh’s AI ecosystem" },
      {
        property: "og:description",
        content:
          "One account. One AI core. A connected ecosystem built around Bangladesh, Bangla, and Banglish.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <StartBDPage />;
}
