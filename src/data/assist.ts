export type ScriptedReply = {
  keywords: string[];
  text: string;
};

export const examplePrompts = [
  "Draft a homepage headline",
  "Plan a product launch week",
  "Explain a reusable component",
  "Write a polite client follow-up",
] as const;

export const scriptedReplies: ScriptedReply[] = [
  {
    keywords: ["headline", "homepage"],
    text: "Demo reply: “Build the page your customer can finish.” Use one promise, one proof, and one next step. This sentence was written ahead of time. No model generated it.",
  },
  {
    keywords: ["launch", "week", "plan"],
    text: "Demo reply: a five-day sketch — Monday story, Tuesday product frames, Wednesday landing page, Thursday questions from friends, Friday a short recap. It is a script, not a generated plan.",
  },
  {
    keywords: ["component", "react", "explain"],
    text: "Demo reply: a reusable component takes data in, renders one job, and does not know about the whole page. Pass the label and the click handler. Keep the fetching elsewhere. This explanation is fixed text.",
  },
  {
    keywords: ["follow-up", "follow up", "client", "polite"],
    text: "Demo reply: “Hello — sharing the latest page for a look. Two open questions are marked in the notes. Happy to adjust this week.” Scripted sample, not a sent email.",
  },
];

export const fallbackReply =
  "This demo has a fixed set of replies. It is not connected to an AI model, and nothing you type is sent to a server. Try one of the example prompts.";
