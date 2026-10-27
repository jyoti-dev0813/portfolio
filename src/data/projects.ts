export type ClaimStatus = "verified" | "needs-confirmation" | "hypothetical";

export type Project = {
  slug: string;
  title: string;
  kind: "reference" | "demo";
  badge?: "CONCEPT PROJECT" | "SELF-INITIATED DEMO";
  summary: string;
  yearLabel: string;
  externalHref?: string;
  demoHref?: string;
  serviceId: string;
  role: string;
  roleStatus: ClaimStatus;
  overview: string;
  objectivesTitle: string;
  objectives: string[];
  designDirection: string;
  features: string[];
  stack: { name: string; status: ClaimStatus }[];
  contribution: string;
  challenges: { text: string; status: ClaimStatus }[];
  preview:
    | "milieu"
    | "doctors"
    | "novacart"
    | "flowdesk"
    | "virelly"
    | "socialspark"
    | "reelcraft"
    | "assist";
};

export const projects: Project[] = [
  {
    slug: "milieu-solar",
    title: "Milieu Solar",
    kind: "reference",
    summary:
      "Public website for Milieu Solar, a Malaysian company offering solar PV systems for homes and for commercial and industrial sites.",
    yearLabel: "Reviewed 26 Oct 2026",
    externalHref: "https://milieu.com.my/",
    serviceId: "frontend",
    role: "I worked on this website. The specific pages and tasks are not confirmed in this repo, so this case study does not describe a solo build.",
    roleStatus: "needs-confirmation",
    overview:
      "Milieu Solar presents itself as a solar solution specialist in Malaysia. The public homepage describes complete solar PV systems for residential and commercial & industrial customers, from design through installation. A quote form asks for service type, Malaysian state, and an average monthly TNB bill range. The site also links to About, Services, Portfolio, News, FAQ, Career, Investor Relations, and a free quote. The company name on the footer is Milieu Solar Sdn Bhd (1408900-M), with a head office in Kota Damansara, Petaling Jaya, and a Johor branch in Iskandar Puteri.",
    objectivesTitle: "What the public site is set up to do",
    objectives: [
      "Explain residential and commercial solar PV services.",
      "Invite a free quote with location and bill-size fields.",
      "Point visitors to portfolio, news, careers, and investor relations.",
      "Offer WhatsApp, Messenger, phone, and email as contact paths.",
    ],
    designDirection:
      "Observed on 26 October 2026: a photographic hero of solar arrays, a blue wordmark over the image, a white content area with a large headline, and a black footer carrying the company statement. A menu button sits in the header. Green WhatsApp and blue Messenger buttons float on the page. This is a description of the live site, not a claim about which parts I designed.",
    features: [
      "Service story for residential and commercial solar",
      "Quote request covering Malaysian states and bill ranges",
      "Portfolio, news, FAQ, careers, and investor relations entries in the menu",
      "Office details for Selangor and Johor, with map links",
      "Direct chat actions for WhatsApp and Messenger",
    ],
    stack: [
      {
        name: "Public site stack was not confirmed from the outside",
        status: "needs-confirmation",
      },
    ],
    contribution:
      "I contributed to the Milieu Solar website. The exact pages and tasks are not confirmed, so this case study does not describe a solo build.",
    challenges: [
      {
        text: "No specific challenge is listed until one can be confirmed.",
        status: "needs-confirmation",
      },
    ],
    preview: "milieu",
  },
  {
    slug: "disruptive-doctors",
    title: "Disruptive Doctors",
    kind: "reference",
    summary:
      "A second project reference. The shared link was not reviewed closely enough to describe the product, so the write-up stays open.",
    yearLabel: "Needs confirmation",
    externalHref: "https://share.google/gYhSWSKVb3EmIdcyy",
    serviceId: "frontend",
    role: "CONFIRM your role. Nothing more specific is claimed.",
    roleStatus: "needs-confirmation",
    overview:
      "Jyoti named Disruptive Doctors as a project reference and shared https://share.google/gYhSWSKVb3EmIdcyy. That destination was not captured into a reliable page description during this build. Overview, audience, and features should be written here only after the live page is checked.",
    objectivesTitle: "Objectives",
    objectives: [
      "CONFIRM the purpose of the project.",
      "CONFIRM which screens or tasks were yours.",
    ],
    designDirection:
      "CONFIRM the visual direction after looking at the live product. No design description is invented here.",
    features: ["CONFIRM the features you want listed."],
    stack: [{ name: "CONFIRM technologies you used", status: "needs-confirmation" }],
    contribution:
      "CONFIRM your contribution. Leave this placeholder until you can state it in a sentence a recruiter could check.",
    challenges: [
      {
        text: "No challenge is listed until one is confirmed.",
        status: "needs-confirmation",
      },
    ],
    preview: "doctors",
  },
  {
    slug: "novacart",
    title: "NovaCart",
    kind: "demo",
    badge: "CONCEPT PROJECT",
    summary:
      "A self-initiated storefront demo with catalog search, product pages, a cart, and a mock checkout. Nothing is for sale.",
    yearLabel: "2026 concept",
    demoHref: "/demos/nova-cart",
    serviceId: "full-stack",
    role: "I designed and built this demo to show an e-commerce interface. It is not a client project.",
    roleStatus: "verified",
    overview:
      "NovaCart is a fictional goods shop: lighting, desk tools, and home pieces. The demo covers browsing, filtering, a product page, quantity controls, and a checkout that stops before payment.",
    objectivesTitle: "Objectives",
    objectives: [
      "Show a complete shopping path without a payment provider.",
      "Keep catalog state understandable on a phone.",
      "Make the concept label impossible to miss.",
    ],
    designDirection:
      "Warm black, copper, and paper type. It is deliberately unlike the violet Shivonix site so the demo reads as its own product.",
    features: [
      "Search, category filters, and price sort",
      "Product detail pages",
      "Cart with quantity controls, stored in this browser",
      "Mock checkout with an explicit no-payment state",
      "Empty and validation states",
    ],
    stack: [
      { name: "Next.js", status: "verified" },
      { name: "TypeScript", status: "verified" },
      { name: "Tailwind CSS", status: "verified" },
      { name: "localStorage for the cart", status: "verified" },
    ],
    contribution: "Concept, interface, and front-end behavior. There is no live catalog or database behind it.",
    challenges: [
      {
        text: "A real shop would need inventory, tax, and a payment provider. The demo refuses that last step on purpose so it cannot look like a charge went through.",
        status: "hypothetical",
      },
    ],
    preview: "novacart",
  },
  {
    slug: "flowdesk",
    title: "FlowDesk",
    kind: "demo",
    badge: "SELF-INITIATED DEMO",
    summary:
      "A sample operations dashboard with KPI cards, a chart, a searchable table, and profile settings. Figures are invented.",
    yearLabel: "2026 concept",
    demoHref: "/demos/flowdesk",
    serviceId: "full-stack",
    role: "I designed and built this demo. The numbers are sample data, not a client’s metrics.",
    roleStatus: "verified",
    overview:
      "FlowDesk pretends to be a small studio’s project desk. It is a front-end demo: overview, pipeline table, profile, and settings, with sample rows only.",
    objectivesTitle: "Objectives",
    objectives: [
      "Show dashboard hierarchy without a chart library.",
      "Make the table searchable, sortable, and filterable from the keyboard.",
      "Include empty, saving, and retry states.",
    ],
    designDirection:
      "Slate panels and an emerald accent, closer to an internal tool than to a marketing site.",
    features: [
      "KPI cards and an interactive monthly chart",
      "Searchable, sortable, filterable pipeline",
      "Profile and settings, with settings stored in this browser",
      "A row that can be retried after a paused sync",
      "An empty state when the Archived filter matches nothing",
    ],
    stack: [
      { name: "Next.js", status: "verified" },
      { name: "TypeScript", status: "verified" },
      { name: "Inline SVG chart", status: "verified" },
    ],
    contribution: "Entire demo interface and sample data. No customer data is connected.",
    challenges: [
      {
        text: "A production desk would need auth and a real data source. This demo keeps both out so it can run with no accounts and no keys.",
        status: "hypothetical",
      },
    ],
    preview: "flowdesk",
  },
  {
    slug: "virelly",
    title: "Virelly Jewellers",
    kind: "demo",
    badge: "CONCEPT PROJECT",
    summary:
      "A luxury jewellery concept store with categories, product pages, and a reserve cart. Pieces and prices are fictional.",
    yearLabel: "2026 concept",
    demoHref: "/demos/virelly",
    serviceId: "shopify",
    role: "I designed and built this concept. Virelly is not a real jeweller and not a commission.",
    roleStatus: "verified",
    overview:
      "Virelly is a quiet storefront for imagined fine jewellery. Original line drawings stand in for product photography. Reserving a piece only confirms the demo locally.",
    objectivesTitle: "Objectives",
    objectives: [
      "Hold a luxury tone without stock photography or a borrowed logo.",
      "Cover category browsing, product pages, and a cart.",
      "Keep the concept label visible.",
    ],
    designDirection:
      "Ivory paper, ink, and a muted gold line. Headlines use a serif. The pace is slower than NovaCart on purpose.",
    features: [
      "Category browsing",
      "Product pages with line-drawn pieces",
      "Cart stored in this browser",
      "A reserve step that does not take payment or send an order",
    ],
    stack: [
      { name: "Next.js", status: "verified" },
      { name: "TypeScript", status: "verified" },
      { name: "Original SVG product art", status: "verified" },
    ],
    contribution: "Concept, art direction, and interface. No inventory and no client.",
    challenges: [
      {
        text: "Real jewellery imagery would need licensed photography or a studio shoot. The demo uses original drawings so it does not borrow a brand’s photos.",
        status: "hypothetical",
      },
    ],
    preview: "virelly",
  },
  {
    slug: "socialspark",
    title: "SocialSpark",
    kind: "demo",
    badge: "CONCEPT PROJECT",
    summary:
      "A campaign gallery for a fictional stationery brand: posts, stories, a brand board, and a one-week calendar.",
    yearLabel: "2026 concept",
    demoHref: "/demos/social-spark",
    serviceId: "social",
    role: "I designed this concept campaign. The brand Paper & Pine is fictional.",
    roleStatus: "verified",
    overview:
      "SocialSpark shows how a small content system can look: feed posts, stories, posters, ads, a brand board, and a calendar. Every piece is labeled as concept work.",
    objectivesTitle: "Objectives",
    objectives: [
      "Show a filterable social gallery.",
      "Pair the posts with a simple calendar.",
      "Avoid fake client logos.",
    ],
    designDirection:
      "Warm paper and a clay-red accent. Layouts are original SVG and CSS, not exported from a real ad account.",
    features: [
      "Filterable post gallery",
      "Story and poster frames",
      "Brand board with sample colors",
      "One-week content calendar",
    ],
    stack: [
      { name: "Next.js", status: "verified" },
      { name: "Original SVG artwork", status: "verified" },
    ],
    contribution: "Concept, copy, and layouts for a made-up brand.",
    challenges: [
      {
        text: "A live social program would need a scheduler and real analytics. This demo stops at the creative system.",
        status: "hypothetical",
      },
    ],
    preview: "socialspark",
  },
  {
    slug: "reelcraft",
    title: "ReelCraft",
    kind: "demo",
    badge: "CONCEPT PROJECT",
    summary:
      "A video-editing showcase built from storyboard frames and animated placeholders. There is no client footage.",
    yearLabel: "2026 concept",
    demoHref: "/demos/reelcraft",
    serviceId: "video",
    role: "I designed this showcase as a concept. Frames are original graphics, not a delivered film.",
    roleStatus: "verified",
    overview:
      "ReelCraft presents a 15-second promo concept for a fictional candle, Lumen Hour. Frames, timecodes, and promo layouts stand in for a cut.",
    objectivesTitle: "Objectives",
    objectives: [
      "Show storyboard thinking without unlicensed video.",
      "Let a visitor step through frames, including when motion is reduced.",
      "Label the work as a concept.",
    ],
    designDirection:
      "A dim cutting-room palette with a single warm highlight. Timecodes use a mono face.",
    features: [
      "Playable frame sequence",
      "Storyboard with timecodes",
      "Promo layout gallery",
      "Reduced-motion path that steps one frame per click",
    ],
    stack: [
      { name: "Next.js", status: "verified" },
      { name: "CSS animation", status: "verified" },
    ],
    contribution: "Concept storyboard and interface. No third-party footage.",
    challenges: [
      {
        text: "A real reel needs rushes, music rights, and a cut. Those are out of scope for a static demo, so the page says so.",
        status: "hypothetical",
      },
    ],
    preview: "reelcraft",
  },
  {
    slug: "ai-assist",
    title: "AI Assist",
    kind: "demo",
    badge: "SELF-INITIATED DEMO",
    summary:
      "A chat interface with scripted replies. No model is connected and no API key is used.",
    yearLabel: "2026 concept",
    demoHref: "/demos/ai-assist",
    serviceId: "ai",
    role: "I designed and built this interface demo. Replies are written ahead of time.",
    roleStatus: "verified",
    overview:
      "AI Assist shows the shape of a working chat product: a sidebar, prompts, message history in this browser, and replies that are chosen from a fixed script.",
    objectivesTitle: "Objectives",
    objectives: [
      "Make the demo boundary obvious.",
      "Support more than one local conversation.",
      "Never call an external model.",
    ],
    designDirection:
      "Quiet graphite and a mint status color. The demo badge stays on every assistant message.",
    features: [
      "Conversation sidebar",
      "Example prompts",
      "Keyword-matched scripted replies",
      "History stored in this browser",
      "Empty and unmatched-question states",
    ],
    stack: [
      { name: "Next.js", status: "verified" },
      { name: "localStorage", status: "verified" },
      { name: "No model API", status: "verified" },
    ],
    contribution: "Interface and script. There is no AI provider behind the replies.",
    challenges: [
      {
        text: "A production assistant would need a model, evaluation, and a privacy note. Wiring that in would require a key, so this demo stays deterministic.",
        status: "hypothetical",
      },
    ],
    preview: "assist",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacent(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return {
    prev: index > 0 ? projects[index - 1] : undefined,
    next: index >= 0 && index < projects.length - 1 ? projects[index + 1] : undefined,
  };
}
