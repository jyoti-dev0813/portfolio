export type SparkFilter = "All" | "Feed" | "Story" | "Poster" | "Ad";

export const sparkFilters: SparkFilter[] = ["All", "Feed", "Story", "Poster", "Ad"];

export type SparkPost = {
  id: string;
  kind: Exclude<SparkFilter, "All">;
  title: string;
  line: string;
};

export const sparkPosts: SparkPost[] = [
  { id: "s1", kind: "Feed", title: "Desk set", line: "Paper, clip, and a Monday list." },
  { id: "s2", kind: "Feed", title: "Ink test", line: "Three blacks, one winner." },
  { id: "s3", kind: "Story", title: "15s fold", line: "A card, a crease, a send-off." },
  { id: "s4", kind: "Story", title: "Restock", line: "Notebooks back on the shelf." },
  { id: "s5", kind: "Poster", title: "Write more", line: "A2 concept for a shop window." },
  { id: "s6", kind: "Ad", title: "Starter kit", line: "Sample price $36. Not for sale." },
];

export const sparkWeek = [
  { day: "Mon", item: "Desk set — feed" },
  { day: "Tue", item: "Ink test — feed" },
  { day: "Wed", item: "15s fold — story" },
  { day: "Thu", item: "Write more — poster" },
  { day: "Fri", item: "Starter kit — ad" },
  { day: "Sat", item: "Restock — story" },
  { day: "Sun", item: "Quiet. No post." },
] as const;

export const reelFrames = [
  { time: "0:00", title: "Match", note: "A dark room, one flame." },
  { time: "0:02", title: "Name", note: "Lumen Hour, set in type." },
  { time: "0:05", title: "Hands", note: "A cup, a page, no faces required." },
  { time: "0:08", title: "Detail", note: "Wax pool, slow push-in." },
  { time: "0:11", title: "Line", note: "“Light for the last hour.”" },
  { time: "0:14", title: "End card", note: "Name, and nothing else." },
] as const;

export const reelLayouts = [
  { title: "Cover", line: "1:1 still for a post." },
  { title: "Caption card", line: "Safe area for burned-in type." },
  { title: "End card", line: "Two seconds, one name." },
  { title: "Storyboard strip", line: "Six frames across." },
] as const;
