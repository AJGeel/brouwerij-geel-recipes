export const viewModes = ["kaarten", "lijst"] as const;
export type ViewMode = (typeof viewModes)[number];
export const defaultViewMode: ViewMode = "kaarten";
