export interface BenchmarkModel {
  name: string;
  provider: string;
  // Artificial Analysis publishes one brand colour per creator. The bar is
  // tinted with it, so a provider reads the same across every model it ships.
  color: string;
  logo: string;
  score: number;
  openWeights?: boolean;
  // The two models the owner has a local demo for. They are ranked here on the
  // same published score as everyone else; the flag only says the code is on
  // this machine, and never changes where the row sits.
  localDemo?: boolean;
}

// Artificial Analysis Intelligence Index v4.3.2, read from the leaderboard's
// own payload on 2026-10-14:
// https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index
//
// The index is a weighted average across ten evaluations, scaled 0 to 100, so
// a score is a position on that scale and not a percentage of anything. These
// are the 31 models carrying a published result at the time of reading, in the
// order the leaderboard ranks them. Scores move as the index is revised, so the
// source and the date are part of the data.
export const INTELLIGENCE_INDEX: BenchmarkModel[] = [
  { name: "Claude Opus 5.5 (Max, Default Fallback)", provider: "Anthropic", color: "#cc785c", logo: "anthropic.svg", score: 57.6 },
  { name: "Claude Sonnet 5.5 (Max, Default Fallback)", provider: "Anthropic", color: "#cc785c", logo: "anthropic.svg", score: 56.0 },
  { name: "Claude Opus 5.5 (Xhigh, Default Fallback)", provider: "Anthropic", color: "#cc785c", logo: "anthropic.svg", score: 56.0 },
  { name: "Muse Wonder Full (Max)", provider: "Anthropic", color: "#cc785c", logo: "anthropic.svg", score: 53.6 },
  { name: "Claude Fable 5.1 (Max, Default Fallback)", provider: "Anthropic", color: "#cc785c", logo: "anthropic.svg", score: 53.4 },
  { name: "Claude Fable 5.1 (Xhigh, Default Fallback)", provider: "Anthropic", color: "#cc785c", logo: "anthropic.svg", score: 53.2 },
  { name: "GPT-6 Astra (Max)", provider: "OpenAI", color: "#1f1f1f", logo: "openai.svg", score: 52.7 },
  { name: "Gemini 4 Argon (High)", provider: "Google", color: "#34A853", logo: "google.svg", score: 52.6 },
  { name: "Muse Wonder (Max)", provider: "Meta", color: "#0089f4", logo: "meta.svg", score: 52.4 },
  { name: "GPT-6 Astra (Xhigh)", provider: "OpenAI", color: "#1f1f1f", logo: "openai.svg", score: 52.4 },
  { name: "Claude Sonnet 5.5 (Xhigh, Default Fallback)", provider: "Anthropic", color: "#cc785c", logo: "anthropic.svg", score: 51.9 },
  { name: "GPT-6.1 Sol (Max)", provider: "OpenAI", color: "#1f1f1f", logo: "openai.svg", score: 51.8 },
  { name: "Muse Spark 1.3 (Max)", provider: "Meta", color: "#0089f4", logo: "meta.svg", score: 48.1 },
  { name: "Grok 4.7 (Xhigh)", provider: "SpaceXAI", color: "#736cd3", logo: "spacexai.svg", score: 46.4 },
  { name: "MiMo-V2.6-Pro", provider: "Xiaomi", color: "#ff6900", logo: "xiaomi.svg", score: 46.3, openWeights: true },
  { name: "Qwen3.8 Max (0902)", provider: "Alibaba", color: "#ff7018", logo: "alibaba.svg", score: 45.4 },
  { name: "GLM-5.3 (Max)", provider: "Z AI", color: "#1c7ff8", logo: "zai.svg", score: 44.8, openWeights: true },
  { name: "Step 5 Preview", provider: "StepFun", color: "#00F5E7", logo: "stepfun.svg", score: 43.7 },
  { name: "Kimi K3 (Max)", provider: "Kimi", color: "#047AFE", logo: "kimi.jpg", score: 43.6, openWeights: true },
  { name: "Claude Haiku 5.5 (Max)", provider: "Anthropic", color: "#cc785c", logo: "anthropic.svg", score: 43.4, localDemo: true },
  { name: "GLM-5.3-Flash", provider: "Z AI", color: "#1c7ff8", logo: "zai.svg", score: 41.8, openWeights: true },
  { name: "Gemini 3.8 Flash (High)", provider: "Google", color: "#34A853", logo: "google.svg", score: 40.9 },
  { name: "DeepSeek V4.1 Flash (Max)", provider: "DeepSeek", color: "#2243e6", logo: "deepseek.svg", score: 39.5, openWeights: true, localDemo: true },
  { name: "Mistral Large 4 Preview", provider: "Mistral", color: "#f32e02", logo: "mistral.svg", score: 38.4 },
  { name: "GPT-6 Luna (Max)", provider: "OpenAI", color: "#1f1f1f", logo: "openai.svg", score: 38.1 },
  { name: "Qwen3.8 27B (Xhigh)", provider: "Alibaba", color: "#ff7018", logo: "alibaba.svg", score: 33.7, openWeights: true },
  { name: "K2 Horizon 375B A23B", provider: "Institute of Foundation Models", color: "#1521a9", logo: "ifm.svg", score: 30.5, openWeights: true },
  { name: "MiniMax-M3", provider: "MiniMax", color: "#EB3568", logo: "minimax.svg", score: 29.2, openWeights: true },
  { name: "Inkling (Xhigh)", provider: "Thinking Machines", color: "#676767", logo: "thinking-machines.svg", score: 25.0, openWeights: true },
  { name: "Nemotron 3 Ultra 550B A55B (Reasoning)", provider: "NVIDIA", color: "#76b900", logo: "nvidia.svg", score: 22.9, openWeights: true },
  { name: "Muse Glimmer (High)", provider: "Meta", color: "#0089f4", logo: "meta.svg", score: 17.5, openWeights: true },
];

export const INDEX_SOURCE = {
  label: "Artificial Analysis Intelligence Index v4.3.2",
  url: "https://artificialanalysis.ai/evaluations/artificial-analysis-intelligence-index",
  readOn: "2026-10-14",
};

// The two demos the owner built against these models. Everything here is
// countable from the files themselves, so the cards state lines, size and
// stack rather than a score the demos never produced.
//
// The titles and the feature lists are in the dictionaries, keyed by id. The
// second demo's title stays "Simulasi Air" in both: that is the name the demo
// carries in its own markup, so translating it would make the card disagree
// with the file it links to.
export interface LocalDemo {
  /** Dictionary key under t.benchmark.demoTitles and t.benchmark.features. */
  id: "haiku" | "deepseek";
  model: string;
  provider: string;
  file: string;
  lines: number;
  bytes: number;
  stack: string[];
}

export const LOCAL_DEMOS: LocalDemo[] = [
  {
    id: "haiku",
    model: "Haiku 5.5",
    provider: "Anthropic",
    file: "/benchmarks/haiku-5.5-water.html",
    lines: 689,
    bytes: 23200,
    stack: ["Three.js", "WebGL", "GLSL"],
  },
  {
    id: "deepseek",
    model: "DeepSeek V4.1 Flash",
    provider: "DeepSeek",
    file: "/benchmarks/deepseek-4.1-flash-water.html",
    lines: 1192,
    bytes: 51225,
    stack: ["WebGL2", "GLSL", "No library"],
  },
];

// The bar lengths share one scale across every row, so a bar twice as long
// really is twice the score. The scale runs to the leader rather than to 100:
// stretching to 100 would squash every real model into the left third and make
// the differences between them unreadable.
export const SCORE_CEILING = Math.ceil(INTELLIGENCE_INDEX[0].score / 5) * 5;