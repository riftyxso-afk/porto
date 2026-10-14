import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { extname, join } from "node:path";

const BENCHMARK_DIR = "/home/riftyxso/Documents/benchmark";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".wasm": "application/wasm",
  ".txt": "text/plain; charset=utf-8",
};

function createStaticSpaServer(name, rootDir, port) {
  const server = createServer(async (req, res) => {
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405, { "Content-Type": "text/plain" }).end("Method not allowed");
      return;
    }
    let pathname = "/";
    try {
      pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    } catch {
      res.writeHead(400).end("Bad request");
      return;
    }
    let filePath = join(rootDir, pathname === "/" ? "index.html" : pathname);
    let fileStat;
    try {
      fileStat = await stat(filePath);
      if (fileStat.isDirectory()) {
        filePath = join(filePath, "index.html");
        fileStat = await stat(filePath);
      }
    } catch {
      // SPA fallback
      filePath = join(rootDir, "index.html");
      try {
        fileStat = await stat(filePath);
      } catch {
        res.writeHead(404).end("Not found");
        return;
      }
    }

    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": contentType,
      "Content-Length": fileStat.size,
      "Cache-Control": "no-cache",
    });
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    createReadStream(filePath).pipe(res);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`[${name}] Port ${port} is already in use (server may already be running).`);
    } else {
      console.error(`[${name}] Error:`, err);
    }
  });

  server.listen(port, "0.0.0.0", () => {
    console.log(`[${name}] Live at http://localhost:${port}`);
  });

  return server;
}

// 1. Capys AI Agency (Port 3005)
const capysProcess = spawn("node", ["scripts/serve.mjs"], {
  cwd: join(BENCHMARK_DIR, "capys/web"),
  env: { ...process.env, PORT: "3005" },
  stdio: "inherit",
});
capysProcess.on("error", (err) => console.error("[Capys] Process error:", err));

// 2. Pear Website Recreation (Port 5173)
const pearProcess = spawn("node", ["scripts/dev.mjs", "--port=5173"], {
  cwd: join(BENCHMARK_DIR, "clone web test"),
  stdio: "inherit",
});
pearProcess.on("error", (err) => console.error("[Pear] Process error:", err));

// 3. Shopify Editions Winter 2026 (Port 5174)
const shopifyProcess = spawn("node", ["scripts/dev.mjs", "--port=5174"], {
  cwd: join(BENCHMARK_DIR, "clone web test/clone 2"),
  stdio: "inherit",
});
shopifyProcess.on("error", (err) => console.error("[Shopify] Process error:", err));

// 4. WareTrack Astra (Port 5175)
const astraServer = createStaticSpaServer(
  "WareTrack Astra",
  join(BENCHMARK_DIR, "gpt 6 astra max/dist"),
  5175
);

// 5. WareTrack Sol (Port 5176)
const solServer = createStaticSpaServer(
  "WareTrack Sol",
  join(BENCHMARK_DIR, "gpt 6.1 sol/dist"),
  5176
);

console.log("\n==================================================");
console.log(" All 5 Benchmark Micro-Servers Initialized:");
console.log(" 1. Capys AI Agency:      http://localhost:3005");
console.log(" 2. Pear Website:         http://localhost:5173");
console.log(" 3. Shopify Editions:     http://localhost:5174/editions/winter2026");
console.log(" 4. WareTrack Astra:      http://localhost:5175");
console.log(" 5. WareTrack Sol:        http://localhost:5176");
console.log("==================================================\n");

function shutdown() {
  console.log("\nStopping all benchmark servers...");
  try { capysProcess.kill(); } catch {}
  try { pearProcess.kill(); } catch {}
  try { shopifyProcess.kill(); } catch {}
  try { astraServer.close(); } catch {}
  try { solServer.close(); } catch {}
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
