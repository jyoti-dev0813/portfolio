export const flowMonths = [
  { label: "May", value: 2400 },
  { label: "Jun", value: 3100 },
  { label: "Jul", value: 2800 },
  { label: "Aug", value: 3600 },
  { label: "Sep", value: 3300 },
  { label: "Oct", value: 3200 },
] as const;

export type PipelineStatus = "Active" | "In review" | "Waiting" | "Sync paused";

export type PipelineRow = {
  id: string;
  project: string;
  client: string;
  status: PipelineStatus;
  value: number;
  updated: string;
};

export const pipelineSeed: PipelineRow[] = [
  { id: "p1", project: "Harbor site", client: "Northline", status: "Active", value: 8400, updated: "12 Oct" },
  { id: "p2", project: "Menu refresh", client: "Olive Room", status: "In review", value: 2200, updated: "18 Oct" },
  { id: "p3", project: "Booking form", client: "Fieldnote", status: "Waiting", value: 1600, updated: "02 Oct" },
  { id: "p4", project: "Staff portal", client: "Cedar Clinic", status: "Sync paused", value: 5400, updated: "21 Oct" },
  { id: "p5", project: "Lookbook", client: "Paper & Pine", status: "Active", value: 3100, updated: "09 Oct" },
  { id: "p6", project: "Quote flow", client: "Lumen Hour", status: "In review", value: 1900, updated: "15 Oct" },
  { id: "p7", project: "Inventory list", client: "Kiln Co", status: "Waiting", value: 2700, updated: "28 Sep" },
  { id: "p8", project: "Launch page", client: "Northwind", status: "Active", value: 4100, updated: "22 Oct" },
];

export const flowTasks = [
  "Send the Harbor homepage notes",
  "Confirm Olive Room type sizes",
  "Replace the paused clinic sync",
  "Draft the Northwind hero line",
  "Check Fieldnote form errors",
] as const;
