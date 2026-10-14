/** Dictionary keys under t.usage.stats. Every figure below names one of them. */
export type UsageStatKey = "total" | "input" | "cached" | "output" | "cost";
/** The smaller line under a figure, read from the same section. */
export type UsageNoteKey = "costNote";

export interface UsageStat {
  /** The label. Read from the dictionary, so it names itself per language. */
  key: UsageStatKey;
  value: number;
  prefix?: string;
  note?: UsageNoteKey;
  // The cost is the figure a reader quotes, so the share card gives it the
  // footer row instead of one of the four grid tiles.
  footer?: boolean;
}

// The owner supplied the provider totals separately from the per-model ones:
// 494,971,950 + 3,600,000,000 and 4,885 + 25,500. Both are folded into the
// tile they belong to, so each number appears once instead of twice.
export const USAGE_STATS: UsageStat[] = [
  { key: "total", value: 30385 },
  { key: "input", value: 4094971950 },
  { key: "cached", value: 302617989 },
  { key: "output", value: 2712947 },
  { key: "cost", value: 180.98, prefix: "~$", note: "costNote", footer: true },
];

// Only the model name. The line beside it ("Top favorite") is a phrase, so it
// lives in the dictionary and the components read it from there.
export const FAVORITE_MODEL = { label: "GPT-6 Astra" };

// The exported image reads these same figures rather than counting up again,
// so a shared picture can never disagree with the page it was taken from.
export function formatUsage(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}