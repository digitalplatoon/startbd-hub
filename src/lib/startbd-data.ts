export type CatalogGroup = "core" | "verticals" | "content";
export type PhaseId = "foundation" | "traffic" | "verticals" | "developers";
export type CatalogAction = "launch" | "beta" | "roadmap";

export type EcosystemService = {
  name: string;
  group: CatalogGroup;
  cluster: string;
  clusterBn: string;
  phase: PhaseId;
  action: CatalogAction;
  icon: string;
  description: string;
  descriptionBn: string;
  searchTerms: string[];
};

export const ecosystemServices: EcosystemService[] = [
  {
    name: "BDai.ai",
    group: "core",
    cluster: "AI Core",
    clusterBn: "এআই কোর",
    phase: "foundation",
    action: "launch",
    icon: "sparkles",
    description: "A Bangladesh-first AI core, made for Bangla, Banglish and local context.",
    descriptionBn: "বাংলা, বাংলিশ ও দেশের প্রেক্ষাপটের জন্য তৈরি বাংলাদেশের এআই কোর।",
    searchTerms: ["ai", "assistant", "bangla", "banglish", "chat"],
  },
  {
    name: "BDai.app",
    group: "core",
    cluster: "AI Core",
    clusterBn: "এআই কোর",
    phase: "foundation",
    action: "launch",
    icon: "smartphone",
    description: "Your everyday doorway to helpful, locally aware AI.",
    descriptionBn: "প্রতিদিনের কাজে স্থানীয় প্রেক্ষাপট বোঝে এমন এআই সহকারী।",
    searchTerms: ["mobile", "app", "assistant"],
  },
  {
    name: "BDai.dev",
    group: "core",
    cluster: "Developer tools",
    clusterBn: "ডেভেলপার টুলস",
    phase: "developers",
    action: "roadmap",
    icon: "code",
    description: "APIs and building blocks for the next generation of Bangla products.",
    descriptionBn: "বাংলা-কেন্দ্রিক নতুন পণ্য তৈরির এপিআই ও প্রয়োজনীয় টুলস।",
    searchTerms: ["developer", "api", "docs", "code"],
  },
  {
    name: "BDai.studio",
    group: "core",
    cluster: "Creative AI",
    clusterBn: "ক্রিয়েটিভ এআই",
    phase: "foundation",
    action: "launch",
    icon: "clapperboard",
    description: "A creative workspace for ideas, writing and visual experiments.",
    descriptionBn: "লেখা, আইডিয়া ও ভিজ্যুয়াল তৈরির জন্য সৃজনশীল কর্মক্ষেত্র।",
    searchTerms: ["creative", "design", "image", "writing"],
  },
  {
    name: "BDaiHub",
    group: "core",
    cluster: "AI Community",
    clusterBn: "এআই কমিউনিটি",
    phase: "foundation",
    action: "beta",
    icon: "orbit",
    description: "One home for discovering tools, sharing knowledge and meeting builders.",
    descriptionBn: "টুল খোঁজা, জ্ঞান ভাগ করা ও নির্মাতাদের সঙ্গে যুক্ত হওয়ার এক ঠিকানা।",
    searchTerms: ["community", "hub", "network"],
  },
  {
    name: "Bangla.autos",
    group: "verticals",
    cluster: "Mobility",
    clusterBn: "যানবাহন",
    phase: "verticals",
    action: "roadmap",
    icon: "car-front",
    description: "A smarter local marketplace for finding your next vehicle.",
    descriptionBn: "আপনার পরের গাড়িটি খুঁজে নেওয়ার সহজ স্থানীয় মার্কেটপ্লেস।",
    searchTerms: ["car", "vehicle", "auto", "mobility"],
  },
  {
    name: "BanglaEV",
    group: "verticals",
    cluster: "Mobility",
    clusterBn: "যানবাহন",
    phase: "verticals",
    action: "roadmap",
    icon: "zap",
    description: "Explore electric vehicles, charging and cleaner journeys in Bangladesh.",
    descriptionBn: "বাংলাদেশে বৈদ্যুতিক যান, চার্জিং ও পরিবেশবান্ধব যাত্রা খুঁজুন।",
    searchTerms: ["ev", "electric", "vehicle", "charge"],
  },
  {
    name: "BanglaInterior",
    group: "verticals",
    cluster: "Home",
    clusterBn: "বাড়ি",
    phase: "foundation",
    action: "beta",
    icon: "lamp-desk",
    description: "Reimagine your space with design ideas shaped for Bangladeshi homes.",
    descriptionBn: "বাংলাদেশের ঘরের জন্য উপযোগী ডিজাইন আইডিয়ায় সাজান আপনার জায়গা।",
    searchTerms: ["interior", "room", "home", "design", "furniture"],
  },
  {
    name: "ApartmentsBD",
    group: "verticals",
    cluster: "Home",
    clusterBn: "বাড়ি",
    phase: "verticals",
    action: "roadmap",
    icon: "building-2",
    description: "Find homes and apartments with a better view of the local market.",
    descriptionBn: "স্থানীয় আবাসন বাজার বুঝে বাসা ও অ্যাপার্টমেন্ট খুঁজে নিন।",
    searchTerms: ["apartment", "flat", "rent", "property", "home"],
  },
  {
    name: "FintechBangla",
    group: "verticals",
    cluster: "Money",
    clusterBn: "অর্থ",
    phase: "verticals",
    action: "roadmap",
    icon: "landmark",
    description: "A more accessible way to navigate financial services and know-how.",
    descriptionBn: "আর্থিক সেবা ও জ্ঞান সহজে খুঁজে পাওয়ার একটি নতুন উপায়।",
    searchTerms: ["finance", "fintech", "money", "banking"],
  },
  {
    name: "BanglaAgri",
    group: "verticals",
    cluster: "Agri",
    clusterBn: "কৃষি",
    phase: "verticals",
    action: "roadmap",
    icon: "sprout",
    description: "Useful knowledge and connections for Bangladesh’s agriculture sector.",
    descriptionBn: "বাংলাদেশের কৃষি খাতের জন্য দরকারি তথ্য ও সংযোগ।",
    searchTerms: ["agriculture", "farm", "crop", "agri"],
  },
  {
    name: "BDSolarpower",
    group: "verticals",
    cluster: "Energy",
    clusterBn: "জ্বালানি",
    phase: "verticals",
    action: "roadmap",
    icon: "sun",
    description: "Discover solar options and practical clean-energy guidance.",
    descriptionBn: "সৌরবিদ্যুৎ ও পরিচ্ছন্ন জ্বালানি সম্পর্কে জানুন।",
    searchTerms: ["solar", "power", "energy", "electricity"],
  },
  {
    name: "FashionBD",
    group: "verticals",
    cluster: "Style",
    clusterBn: "ফ্যাশন",
    phase: "verticals",
    action: "roadmap",
    icon: "shirt",
    description: "Discover local makers, fashion finds and emerging Bangladeshi style.",
    descriptionBn: "স্থানীয় নির্মাতা, ফ্যাশন ও বাংলাদেশের নতুন স্টাইল খুঁজুন।",
    searchTerms: ["fashion", "clothing", "style"],
  },
  {
    name: "workersBD",
    group: "verticals",
    cluster: "Work",
    clusterBn: "কাজ",
    phase: "verticals",
    action: "roadmap",
    icon: "briefcase-business",
    description: "Connect talent, opportunities and practical work resources.",
    descriptionBn: "দক্ষতা, কাজের সুযোগ ও প্রয়োজনীয় রিসোর্সের সংযোগ।",
    searchTerms: ["jobs", "work", "career", "workers", "talent"],
  },
  {
    name: "translateBD",
    group: "content",
    cluster: "Language",
    clusterBn: "ভাষা",
    phase: "traffic",
    action: "launch",
    icon: "languages",
    description: "Translate with a better feel for Bangla, English and everyday context.",
    descriptionBn: "বাংলা, ইংরেজি ও দৈনন্দিন কথার প্রেক্ষাপট বুঝে অনুবাদ।",
    searchTerms: ["translate", "translation", "language", "bangla", "english"],
  },
  {
    name: "writeBD",
    group: "content",
    cluster: "Writing",
    clusterBn: "লেখালেখি",
    phase: "traffic",
    action: "launch",
    icon: "pen-line",
    description: "Get a head start on clear Bangla and English content.",
    descriptionBn: "সহজে তৈরি করুন সুন্দর বাংলা ও ইংরেজি লেখা।",
    searchTerms: ["write", "writing", "content", "blog"],
  },
  {
    name: "BDAsk",
    group: "content",
    cluster: "AI Answers",
    clusterBn: "এআই উত্তর",
    phase: "traffic",
    action: "launch",
    icon: "message-circle-question",
    description: "Ask anything in Bangla, English or Banglish and get a clear answer.",
    descriptionBn: "বাংলা, ইংরেজি বা বাংলিশে প্রশ্ন করুন—পান সহজ উত্তর।",
    searchTerms: ["ask", "question", "answers", "chat", "ai"],
  },
  {
    name: "BanglaSEO",
    group: "content",
    cluster: "Growth",
    clusterBn: "প্রসার",
    phase: "traffic",
    action: "launch",
    icon: "chart-no-axes-combined",
    description: "Help local ideas and businesses get discovered online.",
    descriptionBn: "স্থানীয় উদ্যোগ ও ব্যবসাকে অনলাইনে সহজে খুঁজে পেতে সাহায্য।",
    searchTerms: ["seo", "search", "marketing", "traffic"],
  },
  {
    name: "BanglaPrompts",
    group: "content",
    cluster: "AI Learning",
    clusterBn: "এআই শিক্ষা",
    phase: "traffic",
    action: "launch",
    icon: "lightbulb",
    description: "Prompt ideas and examples to make AI more useful for you.",
    descriptionBn: "এআই থেকে ভালো ফল পেতে কাজের প্রম্পট ও উদাহরণ।",
    searchTerms: ["prompts", "prompt", "ideas", "ai"],
  },
  {
    name: "Bangla.education",
    group: "content",
    cluster: "Education",
    clusterBn: "শিক্ষা",
    phase: "traffic",
    action: "launch",
    icon: "graduation-cap",
    description: "Learning resources with Bangladesh’s students and teachers in mind.",
    descriptionBn: "বাংলাদেশের শিক্ষার্থী ও শিক্ষকদের উপযোগী শেখার রিসোর্স।",
    searchTerms: ["education", "learning", "school", "student"],
  },
  {
    name: "Dhakaly",
    group: "content",
    cluster: "Dhaka Life",
    clusterBn: "ঢাকা জীবন",
    phase: "traffic",
    action: "launch",
    icon: "map-pinned",
    description: "Discover the places, happenings and useful details of Dhaka.",
    descriptionBn: "ঢাকার জায়গা, আয়োজন ও প্রয়োজনীয় তথ্য একসঙ্গে খুঁজুন।",
    searchTerms: ["dhaka", "city", "places", "events"],
  },
];

export const roadmapPhases: {
  id: PhaseId;
  number: string;
  name: string;
  nameBn: string;
  months: string;
  focus: string;
  focusBn: string;
  milestones: string[];
  milestonesBn: string[];
  exit: string;
  exitBn: string;
}[] = [
  {
    id: "foundation",
    number: "01",
    name: "Foundation",
    nameBn: "ভিত্তি",
    months: "M1–M3",
    focus: "One account. One AI core.",
    focusBn: "এক অ্যাকাউন্ট। এক এআই কোর।",
    milestones: ["BDai core & Bangla context", "One Account foundation", "BanglaInterior · first vertical"],
    milestonesBn: ["BDai কোর ও বাংলা প্রেক্ষাপট", "One Account ভিত্তি", "BanglaInterior · প্রথম ভার্টিক্যাল"],
    exit: "Core experience is ready to welcome the first users.",
    exitBn: "প্রথম ব্যবহারকারীদের জন্য কোর অভিজ্ঞতা প্রস্তুত।",
  },
  {
    id: "traffic",
    number: "02",
    name: "Traffic Engine",
    nameBn: "ট্রাফিক ইঞ্জিন",
    months: "M4–M6",
    focus: "Build daily habits and reach.",
    focusBn: "প্রতিদিনের ব্যবহার ও পরিচিতি গড়ে তোলা।",
    milestones: ["BDAsk & translateBD", "writeBD & BanglaSEO", "Content discovery & reach"],
    milestonesBn: ["BDAsk ও translateBD", "writeBD ও BanglaSEO", "কনটেন্ট খোঁজা ও প্রসার"],
    exit: "Useful discovery brings people back to the network.",
    exitBn: "দরকারি সেবা মানুষকে নেটওয়ার্কে ফিরিয়ে আনে।",
  },
  {
    id: "verticals",
    number: "03",
    name: "Vertical Expansion",
    nameBn: "ভার্টিক্যাল বিস্তার",
    months: "M7–M9",
    focus: "Solve more local, specific needs.",
    focusBn: "আরও নির্দিষ্ট স্থানীয় প্রয়োজন মেটানো।",
    milestones: ["Mobility & EV discovery", "Home, money & work", "Agri, energy & style"],
    milestonesBn: ["যানবাহন ও ইভি খোঁজা", "বাড়ি, অর্থ ও কাজ", "কৃষি, জ্বালানি ও ফ্যাশন"],
    exit: "Focused vertical experiences connect to the shared core.",
    exitBn: "বিশেষায়িত সেবাগুলো শেয়ার্ড কোরের সঙ্গে যুক্ত।",
  },
  {
    id: "developers",
    number: "04",
    name: "Developer Ecosystem",
    nameBn: "ডেভেলপার ইকোসিস্টেম",
    months: "M10–M12",
    focus: "Open the ecosystem to builders.",
    focusBn: "নির্মাতাদের জন্য ইকোসিস্টেম উন্মুক্ত করা।",
    milestones: ["BDai.dev API & docs", "Community & creator tools", "Partner-ready ecosystem"],
    milestonesBn: ["BDai.dev এপিআই ও ডকস", "কমিউনিটি ও নির্মাতা টুলস", "পার্টনার-প্রস্তুত ইকোসিস্টেম"],
    exit: "Developers and partners can build on shared foundations.",
    exitBn: "ডেভেলপার ও পার্টনাররা যৌথ ভিত্তির ওপর তৈরি করতে পারেন।",
  },
];

export function filterServices(query: string, group: CatalogGroup | "all") {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  return ecosystemServices.filter((service) => {
    const matchesGroup = group === "all" || service.group === group;
    const searchableText = [
      service.name,
      service.cluster,
      service.clusterBn,
      service.description,
      service.descriptionBn,
      ...service.searchTerms,
    ]
      .join(" ")
      .toLocaleLowerCase();
    return matchesGroup && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
}