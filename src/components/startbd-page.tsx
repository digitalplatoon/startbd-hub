import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  Code2,
  Compass,
  Languages,
  Layers2,
  Menu,
  MessageCircleQuestion,
  Search,
  Sparkles,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  BriefcaseBusiness,
  CarFront,
  ChartNoAxesCombined,
  Clapperboard,
  GraduationCap,
  Landmark,
  LampDesk,
  Lightbulb,
  MapPinned,
  Orbit,
  PenLine,
  Shirt,
  Smartphone,
  Sprout,
  Sun,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ecosystemServices,
  filterServices,
  roadmapPhases,
  type CatalogGroup,
  type PhaseId,
} from "@/lib/startbd-data";
import interiorRoom from "@/assets/bangla-interior-living-room.jpg";
import { useStartBDChatSession } from "@/lib/startbd-chat-session";

type Language = "en" | "bn";

const serviceIcons: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  smartphone: Smartphone,
  code: Code2,
  clapperboard: Clapperboard,
  orbit: Orbit,
  "car-front": CarFront,
  zap: Zap,
  "lamp-desk": LampDesk,
  "building-2": Building2,
  landmark: Landmark,
  sprout: Sprout,
  sun: Sun,
  shirt: Shirt,
  "briefcase-business": BriefcaseBusiness,
  languages: Languages,
  "pen-line": PenLine,
  "message-circle-question": MessageCircleQuestion,
  "chart-no-axes-combined": ChartNoAxesCombined,
  lightbulb: Lightbulb,
  "graduation-cap": GraduationCap,
  "map-pinned": MapPinned,
};

const catalogGroups: { id: CatalogGroup | "all"; label: string; labelBn: string }[] = [
  { id: "all", label: "Everything", labelBn: "সব সেবা" },
  { id: "core", label: "AI Core", labelBn: "এআই কোর" },
  { id: "verticals", label: "Verticals", labelBn: "ভার্টিক্যাল" },
  { id: "content", label: "Content & Traffic", labelBn: "কনটেন্ট ও ট্রাফিক" },
];

const actionCopy = {
  en: { launch: "Launch tool", beta: "Join beta", roadmap: "Preview roadmap" },
  bn: { launch: "টুল দেখুন", beta: "বেটায় যোগ দিন", roadmap: "রোডম্যাপ দেখুন" },
};

const phaseNames: Record<PhaseId, { en: string; bn: string }> = {
  foundation: { en: "Phase 1 · Foundation", bn: "পর্ব ১ · ভিত্তি" },
  traffic: { en: "Phase 2 · Traffic", bn: "পর্ব ২ · ট্রাফিক" },
  verticals: { en: "Phase 3 · Verticals", bn: "পর্ব ৩ · ভার্টিক্যাল" },
  developers: { en: "Phase 4 · Developers", bn: "পর্ব ৪ · ডেভেলপার" },
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function StartBDPage() {
  const { language, setLanguage, createThread } = useStartBDChatSession();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [group, setGroup] = useState<CatalogGroup | "all">("all");
  const [search, setSearch] = useState("");
  const [selectedPhase, setSelectedPhase] = useState<PhaseId>("foundation");
  const [comparison, setComparison] = useState(54);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("user");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [waitlistDone, setWaitlistDone] = useState(false);
  const isBangla = language === "bn";

  const services = useMemo(() => filterServices(search, group), [search, group]);
  const activePhase = roadmapPhases.find((phase) => phase.id === selectedPhase);

  useEffect(() => {
    return () => {
      if (uploadedPhoto) URL.revokeObjectURL(uploadedPhoto);
    };
  }, [uploadedPhoto]);

  const handlePhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    setUploadedPhoto((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(file);
    });
  };

  const handleWaitlist = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      return;
    }
    if (otp.length === 6) setWaitlistDone(true);
  };

  const openChat = (question?: string) => {
    const threadId = createThread(question);
    void navigate({
      to: "/chat/$threadId",
      params: { threadId },
    });
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  if (!activePhase) return null;

  return (
    <motion.main
      className="startbd-home"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="site-header">
        <a aria-label="startBD home" className="brand-lockup" href="#home">
          <span className="brand-mark"><span /></span>
          <span className="brand-word">start<span>BD</span><i>.</i></span>
        </a>
        <nav aria-label={isBangla ? "প্রধান নেভিগেশন" : "Main navigation"} className={mobileNavOpen ? "primary-nav is-open" : "primary-nav"}>
          <a href="#ecosystem" onClick={() => setMobileNavOpen(false)}>{isBangla ? "ইকোসিস্টেম" : "Ecosystem"}</a>
          <a href="#spotlight" onClick={() => setMobileNavOpen(false)}>{isBangla ? "স্পটলাইট" : "Spotlight"}</a>
          <a href="#bdask" onClick={() => setMobileNavOpen(false)}>{isBangla ? "BDai-কে জিজ্ঞেস করুন" : "Ask BDai"}</a>
          <a href="#roadmap" onClick={() => setMobileNavOpen(false)}>{isBangla ? "রোডম্যাপ" : "Roadmap"}</a>
          <a href="#developers" onClick={() => setMobileNavOpen(false)}>{isBangla ? "ডেভেলপার হাব" : "Developer hub"}</a>
        </nav>
        <div className="header-actions">
          <button
            aria-label={isBangla ? "Switch to English" : "বাংলায় দেখুন"}
            className="language-switch"
            onClick={() => setLanguage(isBangla ? "en" : "bn")}
            type="button"
          >
            <Languages aria-hidden="true" size={16} />
            {isBangla ? "EN" : "বাং"}
          </button>
          <Button className="header-cta" onClick={() => openChat()}>
            {isBangla ? "BDai-কে জিজ্ঞেস করুন" : "Ask BDai"}
            <ArrowUpRight aria-hidden="true" />
          </Button>
          <Button aria-label={mobileNavOpen ? "Close menu" : "Open menu"} className="mobile-menu" onClick={() => setMobileNavOpen(!mobileNavOpen)} size="icon" variant="outline">
            {mobileNavOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </header>

      <motion.section aria-labelledby="hero-title" className="hero-section motion-reveal" id="home" initial={reduceMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="hero-copy">
          <div className="eyebrow"><span className="live-dot" /> {isBangla ? "বাংলাদেশের প্রথম সমন্বিত এআই ইকোসিস্টেম" : "Bangladesh’s integrated AI ecosystem"}</div>
          <h1 id="hero-title">{isBangla ? <>এক অ্যাকাউন্ট।<br /><span>এক এআই কোর।</span><br />বাংলাদেশের জন্য।</> : <>One account.<br /><span>One AI core.</span><br />Built for Bangladesh.</>}</h1>
          <p className="hero-description">
            {isBangla
              ? "BDai-এর শক্তিতে, বাংলাদেশের জন্য তৈরি এক নেটওয়ার্ক। বাংলা, বাংলিশ ও আমাদের প্রতিদিনের জীবনের সঙ্গে মানানসই।"
              : "One connected network, powered by BDai and made for the way Bangladesh thinks, speaks and gets things done—in Bangla, English and Banglish."}
          </p>
          <div className="hero-buttons">
            <Button className="button-primary" onClick={() => openChat()} size="lg">
              {isBangla ? "BDai-কে প্রশ্ন করুন" : "Ask the startBD guide"}
              <ArrowRight aria-hidden="true" />
            </Button>
            <a className="hero-text-link" href="#early-access">{isBangla ? "আর্লি অ্যাক্সেসে যোগ দিন" : "Get early access"}<ArrowUpRight aria-hidden="true" size={15} /></a>
          </div>
          <div className="hero-search-wrap">
            <label className="hero-search" htmlFor="service-search">
              <Search aria-hidden="true" size={19} />
              <input
                autoComplete="off"
                id="service-search"
                onChange={(event) => setSearch(event.currentTarget.value)}
                onFocus={() => scrollToSection("ecosystem")}
                placeholder={isBangla ? "interior, EV, translate, jobs খুঁজুন…" : "Try interior, EV, translate, jobs…"}
                type="search"
                value={search}
              />
              <kbd>↵</kbd>
            </label>
            <div className="search-suggestions"><span>{isBangla ? "জনপ্রিয়:" : "Popular:"}</span>{["interior", "EV", "translate", "jobs"].map((term) => <button key={term} onClick={() => { setSearch(term); scrollToSection("ecosystem"); }} type="button">{term}</button>)}</div>
          </div>
        </div>
        <div aria-label="A connected ecosystem of locally built AI tools" className="ecosystem-map">
          <div className="map-topline"><span className="map-kicker"><Workflow aria-hidden="true" size={15} /> {isBangla ? "একটি সংযুক্ত নেটওয়ার্ক" : "ONE CONNECTED NETWORK"}</span><span className="map-status"><span className="live-dot" /> 2026</span></div>
          <div className="map-canvas">
            <div className="map-gridline map-gridline-one" />
            <div className="map-gridline map-gridline-two" />
            <div className="map-ring map-ring-outer" />
            <div className="map-ring map-ring-inner" />
            <div className="map-link map-link-a" /><div className="map-link map-link-b" />
            <div className="map-link map-link-c" /><div className="map-link map-link-d" />
            <div className="map-node node-interior"><LampDesk /><span>Home</span></div>
            <div className="map-node node-ask"><MessageCircleQuestion /><span>Ask</span></div>
            <div className="map-node node-ev"><Zap /><span>Mobility</span></div>
            <div className="map-node node-learn"><Lightbulb /><span>Learn</span></div>
            <div className="map-core"><span className="core-icon"><Sparkles /></span><strong>BDai</strong><small>{isBangla ? "বাংলার এআই কোর" : "AI for Bangladesh"}</small></div>
            <div className="map-caption"><span>01</span><p>{isBangla ? "একটি কোর। অনেক দরকারি অভিজ্ঞতা।" : "One core. Many useful experiences."}</p></div>
          </div>
          <div className="map-bottomline"><span><Layers2 aria-hidden="true" size={14} /> {isBangla ? "স্থানীয়ভাবে তৈরি · একসঙ্গে যুক্ত" : "Locally built · Connected by design"}</span><span>startBD.com <ArrowUpRight aria-hidden="true" size={14} /></span></div>
        </div>
        <div className="hero-bottom">
          <div className="hero-proof"><span className="proof-mark">{isBangla ? "বাং" : "BD"}</span><span>{isBangla ? "বাংলার জন্য তৈরি" : "Made for Bangladesh"}</span><span className="proof-separator">/</span><span>{isBangla ? "বাংলা · বাংলিশ · ইংরেজি" : "Bangla · Banglish · English"}</span></div>
          <a className="scroll-cue" href="#ecosystem">{isBangla ? "এক্সপ্লোর করুন" : "Scroll to explore"}<ArrowDown aria-hidden="true" size={14} /></a>
        </div>
      </motion.section>

      <motion.section aria-label="Ecosystem at a glance" className="stats-band motion-reveal" initial={reduceMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
        <div className="stats-inner">
          <div className="stat-item"><span className="stat-value">{ecosystemServices.length}<small>+</small></span><span className="stat-label">{isBangla ? "ইকোসিস্টেম সেবা" : "Ecosystem services"}</span></div>
          <div className="stat-item"><span className="stat-value">09</span><span className="stat-label">{isBangla ? "পরিকল্পিত ভার্টিক্যাল" : "Planned verticals"}</span></div>
          <div className="stat-item"><span className="stat-value">04</span><span className="stat-label">{isBangla ? "লঞ্চ পর্ব" : "Launch phases"}</span></div>
          <div className="stat-note"><span className="status-indicator"><span className="live-dot" /> {isBangla ? "এখন তৈরি হচ্ছে" : "IN THE MAKING"}</span><p>{isBangla ? "নভেম্বর ২০২৬ · v1.0 রোডম্যাপ" : "November 2026 · v1.0 roadmap"}</p></div>
        </div>
      </motion.section>

      <motion.section className="directory-section page-section motion-reveal" id="ecosystem" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55 }}>
        <div className="section-heading directory-heading">
          <div><div className="section-eyebrow"><span>01</span> {isBangla ? "ইকোসিস্টেম এক্সপ্লোরার" : "THE ECOSYSTEM EXPLORER"}</div><h2>{isBangla ? <>একটি কোর।<br /><span>আপনার সব প্রয়োজন।</span></> : <>One core.<br /><span>A world of useful.</span></>}</h2></div>
          <div className="section-heading-aside"><p>{isBangla ? "বাংলাদেশের মানুষ ও ব্যবসার জন্য নকশা করা এআই সেবা, এক নেটওয়ার্কে।" : "A growing network of AI-powered tools and local-first services, designed around the way Bangladesh lives and works."}</p><span className="directory-count">SHOWING <b>{services.length.toString().padStart(2, "0")}</b> / 21</span></div>
        </div>
        <div className="catalog-controls">
          <div aria-label="Filter services by category" className="catalog-tabs" role="tablist">
            {catalogGroups.map((item) => <button aria-selected={group === item.id} className={group === item.id ? "catalog-tab is-active" : "catalog-tab"} key={item.id} onClick={() => setGroup(item.id)} role="tab" type="button">{isBangla ? item.labelBn : item.label}<span>{item.id === "all" ? ecosystemServices.length : ecosystemServices.filter((service) => service.group === item.id).length}</span></button>)}
          </div>
          <label className="catalog-search" htmlFor="catalog-search"><Search aria-hidden="true" size={16} /><input id="catalog-search" onChange={(event) => setSearch(event.currentTarget.value)} placeholder={isBangla ? "সেবায় খুঁজুন" : "Search the network"} type="search" value={search} />{search && <button aria-label="Clear search" onClick={() => setSearch("")} type="button"><X size={15} /></button>}</label>
        </div>
        {services.length ? <div className="service-grid">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon] ?? Sparkles;
            const actionTarget = service.action === "roadmap" ? "#roadmap" : service.action === "beta" ? "#early-access" : "#bdask";
            return <article className="service-card" key={service.name}>
              <div className="service-card-top"><span className={`service-icon service-icon-${service.group}`}><Icon aria-hidden="true" size={19} /></span><span className="service-number">{String(index + 1).padStart(2, "0")}</span></div>
              <div className="service-meta"><span className="cluster-tag">{isBangla ? service.clusterBn : service.cluster}</span><span className="phase-tag">{phaseNames[service.phase][isBangla ? "bn" : "en"]}</span></div>
              <h3>{service.name}</h3>
              <p>{isBangla ? service.descriptionBn : service.description}</p>
              <a className="service-action" href={actionTarget} onClick={service.action === "launch" ? (event) => { event.preventDefault(); openChat(`Tell me about ${service.name}`); } : undefined}>{actionCopy[language][service.action]}<ArrowUpRight aria-hidden="true" size={16} /></a>
            </article>;
          })}
        </div> : <div className="empty-results"><Compass aria-hidden="true" size={26} /><p>{isBangla ? "এই খোঁজে কোনো সেবা পাওয়া যায়নি।" : "No services matched that search."}</p><Button onClick={() => { setSearch(""); setGroup("all"); }} variant="outline">{isBangla ? "সব সেবা দেখুন" : "See all services"}</Button></div>}
        <div className="directory-end"><span><span className="live-dot" /> {isBangla ? "আরও সেবা আসছে" : "MORE SERVICES ARE ON THE WAY"}</span><a href="#roadmap">{isBangla ? "সম্পূর্ণ রোডম্যাপ" : "View the full roadmap"}<ArrowRight aria-hidden="true" size={15} /></a></div>
      </motion.section>

      <motion.section className="spotlight-section page-section motion-reveal" id="spotlight" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55 }}>
        <div className="spotlight-heading"><div className="section-eyebrow"><span>02</span> {isBangla ? "প্রথম ভার্টিক্যাল · ফেজ ১" : "FIRST VERTICAL · PHASE 01"}</div><h2>{isBangla ? <>একটি নতুন<br />ধরনের <span>ঘর ভাবুন।</span></> : <>See your space<br />in a <span>new light.</span></>}</h2><p>{isBangla ? "বাংলাদেশি ঘরের জন্য নকশা করা ডিজাইন পরামর্শ। আপনার জায়গার একটি ছবি থেকে শুরু করুন।" : "BanglaInterior brings thoughtful, locally aware design ideas to the homes we know. Start with a photo of your own space."}<br /><span>{isBangla ? "বাংলাদেশের ঘরের জন্য, বাংলাদেশেই তৈরি।" : "Designed for the way we live here."}</span></p><div className="spotlight-tags"><span><Check size={13} /> {isBangla ? "বাংলাদেশি বাড়ির মাপ" : "Bangladeshi home sizes"}</span><span><Check size={13} /> {isBangla ? "স্থানীয় নান্দনিকতা" : "Local design sensibility"}</span></div></div>
        <div className="room-feature">
          <div className="room-image-wrap">
            <img alt="A bright, thoughtfully designed Dhaka apartment living room" className="room-image-base" height={912} src={uploadedPhoto ?? interiorRoom} width={1200} />
            <div aria-hidden="true" className="room-image-after" style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }}><img alt="" height={912} src={uploadedPhoto ?? interiorRoom} width={1200} /></div>
            <div aria-hidden="true" className="comparison-divider" style={{ left: `${comparison}%` }}><span><ChevronDown size={15} /></span></div>
            <span className="compare-label compare-before">{isBangla ? "আপনার জায়গা" : "YOUR SPACE"}</span>
            <span className="compare-label compare-after">{isBangla ? "নতুন অনুপ্রেরণা" : "FRESH INSPIRATION"}</span>
            <div className="room-caption"><span className="caption-logo"><LampDesk size={16} /></span><span><strong>BanglaInterior</strong><small>{isBangla ? "আপনার ঘর, নতুন করে" : "A fresh perspective for home"}</small></span><span className="caption-phase">PHASE 01</span></div>
            <input aria-label="Compare your space with inspiration" className="compare-input" max="100" min="0" onChange={(event) => setComparison(Number(event.currentTarget.value))} type="range" value={comparison} />
          </div>
          <div className="room-toolbar"><span>{isBangla ? "এটি একটি ডিজাইন প্রিভিউ" : "DESIGN PREVIEW"}<span className="preview-divider">·</span>{isBangla ? "ছবি আপলোড করুন" : "ADD YOUR ROOM PHOTO"}</span><label className="upload-link" htmlFor="room-photo">{uploadedPhoto ? (isBangla ? "অন্য ছবি বেছে নিন" : "Choose another photo") : (isBangla ? "ছবি বেছে নিন" : "Choose a photo")}<ArrowUpRight size={14} /><input accept="image/*" id="room-photo" onChange={handlePhoto} type="file" /></label></div>
          <p className="preview-disclaimer">{isBangla ? "ছবিটি শুধু এই প্রিভিউতে দেখানো হবে—কোথাও পাঠানো হয় না। ডিজাইন জেনারেশন এখনও চালু নয়।" : "Your photo stays in this preview. No image is uploaded; AI redesign is not connected yet."}</p>
        </div>
      </motion.section>

      <motion.section aria-labelledby="bdask-title" className="bdask-section motion-reveal" id="bdask" initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55 }}>
        <div className="bdask-inner">
          <div className="bdask-copy"><div className="section-eyebrow section-eyebrow-light"><span>03</span> {isBangla ? "BDai কোর · লাইভ প্রিভিউ" : "BDai CORE · INTERACTIVE PREVIEW"}</div><h2 id="bdask-title">{isBangla ? <>আপনার ভাষায় বলুন।<br /><span>উত্তরও পান সেভাবে।</span></> : <>Think in Bangla.<br /><span>Ask away.</span></>}</h2><p>{isBangla ? "বাংলা, বাংলিশ বা ইংরেজিতে প্রশ্ন করুন। BDai আপনার প্রেক্ষাপট বুঝতে তৈরি।" : "A glimpse of what a Bangladesh-first AI can feel like. Ask naturally—in Bangla, English or the way you actually talk."}</p><div className="bdask-stamps"><span><Languages size={15} /> Bangla</span><span>বাংলিশ</span><span>English</span></div><a className="light-link" href="#ecosystem">{isBangla ? "BDai ও BDAsk দেখুন" : "Discover BDai & BDAsk"}<ArrowRight size={15} /></a></div>
          <div className="chat-demo">
            <div className="chat-top"><span className="chat-avatar"><span className="chat-avatar-monogram">BD</span></span><span><strong>BDai <i>{isBangla ? "প্রশ্নোত্তর" : "ECOSYSTEM GUIDE"}</i></strong><small>{isBangla ? "বাংলা · বাংলিশ · English" : "Bangla · Banglish · English"}</small></span><span className="chat-online"><span className="live-dot" /> {isBangla ? "লাইভ এআই" : "AI Q&A"}</span></div>
            <div className="chat-preview-copy"><span className="chat-preview-kicker">{isBangla ? "আপনার startBD গাইড" : "YOUR startBD GUIDE"}</span><p>{isBangla ? "সেবা, রোডম্যাপ বা আপনার প্রয়োজন নিয়ে প্রশ্ন করুন।" : "Ask about a service, the roadmap, or what fits your needs."}</p></div>
            <div className="chat-suggestion-list">
              {(isBangla ? ["startBD কী?", "প্রথম ধাপে কী আসবে?"] : ["What is startBD?", "What’s planned for Phase 1?"]).map((question) => (
                <Button className="chat-suggestion" key={question} onClick={() => openChat(question)} variant="outline">{question}<ArrowUpRight aria-hidden="true" /></Button>
              ))}
            </div>
            <Button className="chat-start-button" onClick={() => openChat()}>{isBangla ? "প্রশ্ন করুন" : "Ask BDai"}<ArrowRight aria-hidden="true" /></Button>
            <div className="chat-footnote">{isBangla ? "এই সেশনের কথোপকথন ব্রাউজারেই থাকবে।" : "Conversations stay in this browser session only."}</div>
          </div>
        </div>
      </motion.section>

      <motion.section className="roadmap-section page-section motion-reveal" id="roadmap" initial={reduceMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.55 }}>
        <div className="section-heading roadmap-heading"><div><div className="section-eyebrow"><span>04</span> {isBangla ? "১২ মাসের রোডম্যাপ" : "THE 12-MONTH ROADMAP"}</div><h2>{isBangla ? <>ধাপে ধাপে।<br /><span>একসঙ্গেই এগিয়ে।</span></> : <>Build with purpose.<br /><span>Grow by phase.</span></>}</h2></div><div className="section-heading-aside"><p>{isBangla ? "v1.0 পরিকল্পনা · নভেম্বর ২০২৬" : "A clear path from a shared foundation to an open ecosystem. v1.0 plan · November 2026."}<br /><span>{isBangla ? "পরিকল্পিত ১২ মাস · ৪টি ফেজ" : "12 planned months · 4 phases"}</span></p><div className="roadmap-key"><span className="key-foundation" />{isBangla ? "নির্মাণ" : "Build"}<span className="key-community" />{isBangla ? "ব্যবহারকারীর জন্য" : "For people"}</div></div></div>
        <div className="timeline-tabs" role="tablist" aria-label={isBangla ? "রোডম্যাপের ধাপ" : "Roadmap phases"}>
          {roadmapPhases.map((phase) => <button aria-selected={selectedPhase === phase.id} className={selectedPhase === phase.id ? "timeline-tab is-selected" : "timeline-tab"} key={phase.id} onClick={() => setSelectedPhase(phase.id)} role="tab" type="button"><span className="timeline-dot" /><span className="timeline-tab-copy"><small>PHASE {phase.number}</small><strong>{isBangla ? phase.nameBn : phase.name}</strong><span>{phase.months}</span></span></button>)}
        </div>
        <div className="phase-detail" role="tabpanel">
          <div className="phase-detail-main"><span className="phase-overline">PHASE {activePhase.number} <span>·</span> {activePhase.months}</span><h3>{isBangla ? activePhase.focusBn : activePhase.focus}</h3><div className="milestone-list">{(isBangla ? activePhase.milestonesBn : activePhase.milestones).map((milestone, index) => <div className="milestone" key={milestone}><span>{String(index + 1).padStart(2, "0")}</span><p>{milestone}</p><Check size={15} /></div>)}</div><div className="exit-criteria"><span>{isBangla ? "ফেজের লক্ষ্য" : "PHASE EXIT CRITERIA"}</span><p>{isBangla ? activePhase.exitBn : activePhase.exit}</p></div></div>
          <div className="phase-architecture"><div className="architecture-label"><Workflow size={15} /> {isBangla ? "ইকোসিস্টেম আর্কিটেকচার" : "ECOSYSTEM ARCHITECTURE"}</div><div className="architecture-map"><div className="architecture-spine" /><span className="architecture-satellite satellite-one">{activePhase.id === "foundation" ? "One Account" : activePhase.id === "traffic" ? "BDAsk" : activePhase.id === "verticals" ? "BanglaEV" : "BDai.dev"}</span><span className="architecture-satellite satellite-two">{activePhase.id === "foundation" ? "BanglaInterior" : activePhase.id === "traffic" ? "translateBD" : activePhase.id === "verticals" ? "ApartmentsBD" : "Community"}</span><div className="architecture-core"><Sparkles /><b>BDai</b><small>SHARED CORE</small></div><span className="architecture-satellite satellite-three">{activePhase.id === "foundation" ? "BDaiHub" : activePhase.id === "traffic" ? "writeBD" : activePhase.id === "verticals" ? "BanglaAgri" : "Builders"}</span></div><div className="architecture-foot"><span className="live-dot" />{isBangla ? "একটি কোর · এই ফেজের অভিজ্ঞতা" : "One core · experiences in this phase"}</div></div>
        </div>
        <div className="roadmap-disclaimer">{isBangla ? "এটি পরিকল্পিত টাইমলাইন, চালু সেবার তালিকা নয়।" : "Planned milestones—not a statement of currently live services."}</div>
      </motion.section>

      <motion.section className="early-access-section motion-reveal" id="early-access" initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55 }}>
        <div className="early-access-grid">
          <div className="early-access-copy"><div className="section-eyebrow section-eyebrow-light"><span>05</span> {isBangla ? "আগে যুক্ত হন" : "BE PART OF WHAT’S NEXT"}</div><h2>{isBangla ? <>এক অ্যাকাউন্ট।<br /><span>সবকিছুতে সহজ প্রবেশ।</span></> : <>One Account.<br /><span>Doors open wider.</span></>}</h2><p>{isBangla ? "আপনার ভূমিকাটি বেছে নিন, শুরুর খবর সবার আগে জানুন।" : "Get a first look as the startBD network comes together. Choose how you’d like to be part of it."}</p><div className="role-preview"><span><Check size={13} /> User</span><span><Check size={13} /> Creator</span><span><Check size={13} /> Developer</span><span><Check size={13} /> Partner</span></div></div>
          <form className="waitlist-form" onSubmit={handleWaitlist}>
            <div className="form-heading"><span>{waitlistDone ? <Check size={19} /> : "↗"}</span><div><h3>{waitlistDone ? (isBangla ? "প্রিভিউ সম্পন্ন" : "Preview complete") : (isBangla ? "আপনার জায়গা নিশ্চিত করুন" : "Save your place")}</h3><p>{waitlistDone ? (isBangla ? "এটি একটি ডেমো—কোনো অ্যাকাউন্ট তৈরি হয়নি।" : "This was only a demo. No account was created.") : (isBangla ? "One Account · একবার যোগ দিন, সব সেবায় থাকুন" : "One Account · One place across the network")}</p></div></div>
            {!waitlistDone && <>
              {!otpSent ? <>
                <label className="field-label" htmlFor="phone-number">{isBangla ? "মোবাইল নম্বর" : "PHONE NUMBER"}</label>
                <div className="phone-input"><span>🇧🇩 <b>+880</b></span><input autoComplete="tel-national" id="phone-number" onChange={(event) => setPhone(event.currentTarget.value)} pattern="[0-9 +()-]{7,18}" placeholder="1XXX-XXXXXX" required type="tel" value={phone} /></div>
                <label className="field-label role-label" htmlFor="role-select">{isBangla ? "আমি একজন" : "I’M HERE AS A"}</label>
                <div className="select-wrap"><select id="role-select" onChange={(event) => setRole(event.currentTarget.value)} value={role}><option value="user">{isBangla ? "ব্যবহারকারী" : "User"}</option><option value="creator">{isBangla ? "ক্রিয়েটর" : "Creator"}</option><option value="developer">{isBangla ? "ডেভেলপার" : "Developer"}</option><option value="business">{isBangla ? "বিজনেস পার্টনার" : "Business partner"}</option></select><ChevronDown size={16} /></div>
                <Button className="waitlist-submit" type="submit">{isBangla ? "আর্লি অ্যাক্সেসে যোগ দিন" : "Join early access"}<ArrowRight size={17} /></Button>
              </> : <>
                <div className="otp-message"><span className="otp-phone-icon"><Smartphone size={18} /></span><p>{isBangla ? <>+880 {phone} নম্বরে পাঠানো<br />৬ সংখ্যার কোড দিন</> : <>Enter the 6-digit code<br />sent to +880 {phone}</>}</p></div>
                <label className="field-label" htmlFor="otp-code">{isBangla ? "ডেমো ভেরিফিকেশন কোড" : "DEMO VERIFICATION CODE"}</label>
                <input autoComplete="one-time-code" className="otp-input" id="otp-code" inputMode="numeric" maxLength={6} onChange={(event) => setOtp(event.currentTarget.value.replace(/\D/g, "").slice(0, 6))} pattern="[0-9]{6}" placeholder="· · · · · ·" required value={otp} />
                <Button className="waitlist-submit" disabled={otp.length !== 6} type="submit">{isBangla ? "প্রিভিউ চালিয়ে যান" : "Continue preview"}<ArrowRight size={17} /></Button>
                <button className="back-to-phone" onClick={() => { setOtpSent(false); setOtp(""); }} type="button">{isBangla ? "নম্বর বদলান" : "Change number"}</button>
              </>}
              <p className="form-disclaimer">{isBangla ? "প্রিভিউ মাত্র—কোড পাঠানো, সাইন-ইন বা তথ্য সংরক্ষণ চালু নেই।" : "Preview only. No code is sent, and nothing is saved or signed in."}</p>
            </>}
          </form>
        </div>
      </motion.section>

      <motion.section className="developer-section page-section motion-reveal" id="developers" initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }}>
        <div className="developer-glyph"><Code2 aria-hidden="true" size={29} /><span>BDai.dev</span></div>
        <div className="developer-copy"><div className="section-eyebrow"><span>06</span> {isBangla ? "নির্মাতাদের জন্য" : "FOR THE BUILDERS"}</div><h2>{isBangla ? "বাংলার পরের অধ্যায় তৈরি করুন।" : "Build what comes next."}</h2><p>{isBangla ? "BDai.dev-এর এপিআই, ডকস ও কমিউনিটি হাবের খবর পেতে আগ্রহ জানান।" : "Build with a shared AI core and a growing suite of locally relevant services. BDai.dev API docs and the builder community are on the roadmap."}</p></div>
        <a className="developer-cta" href="#early-access"><span>{isBangla ? "ডেভেলপার হিসেবে যোগ দিন" : "Join as a developer"}</span><ArrowUpRight size={18} /></a>
      </motion.section>

      <footer className="site-footer">
        <div className="footer-top"><div className="footer-brand"><a aria-label="startBD home" className="brand-lockup" href="#home"><span className="brand-mark"><span /></span><span className="brand-word">start<span>BD</span><i>.</i></span></a><p>{isBangla ? "বাংলাদেশের প্রথম সমন্বিত এআই ইকোসিস্টেম।" : "Bangladesh’s integrated AI ecosystem."}</p><span className="footer-local"><span className="live-dot" /> MADE FOR BANGLADESH</span></div>
          <div className="footer-links-column"><span>{isBangla ? "ইকোসিস্টেম" : "ECOSYSTEM"}</span><a href="#ecosystem">BDai Core</a><a href="#ecosystem">Mobility & Home</a><a href="#ecosystem">Content & Traffic</a><a href="#roadmap">Roadmap</a></div>
          <div className="footer-links-column"><span>{isBangla ? "যোগ দিন" : "GET INVOLVED"}</span><a href="#early-access">{isBangla ? "আর্লি অ্যাক্সেস" : "Early access"}</a><a href="#developers">BDai.dev</a><a href="#developers">Developer hub</a><a href="#spotlight">BanglaInterior</a></div>
          <div className="footer-network"><span className="network-index">THE startBD NETWORK</span><p>{isBangla ? "এই সেবা startBD নেটওয়ার্কের অংশ।" : "Every service, connected by one core."}</p><div className="network-pills"><span>BDai</span><span>Bangla</span><span>Bangladesh</span></div><a href="#home">startBD.com <ArrowUpRight size={14} /></a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 startBD.com</span><span className="footer-tagline">One network. Built around us.</span><div><a href="#home">{isBangla ? "গোপনীয়তা" : "Privacy"}</a><a href="#home">{isBangla ? "শর্তাবলি" : "Terms"}</a><a aria-label="Back to top" href="#home">Back to top ↑</a></div></div>
      </footer>
    </motion.main>
  );
}