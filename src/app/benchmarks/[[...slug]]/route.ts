import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await context.params;

  // If visiting /benchmarks root without slug, redirect to /recap
  if (!slug || slug.length === 0) {
    return NextResponse.redirect(new URL("/recap", request.url));
  }

  const publicBenchmarksDir = path.join(process.cwd(), "public/benchmarks");
  let targetPath = path.join(publicBenchmarksDir, ...slug);

  // 1. If it's an existing directory, serve index.html inside it
  if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
    targetPath = path.join(targetPath, "index.html");
  }
  // 2. If file not found, check if adding .html exists (e.g. /benchmarks/pulau-pelan -> pulau-pelan.html)
  else if (!fs.existsSync(targetPath) && fs.existsSync(targetPath + ".html")) {
    targetPath = targetPath + ".html";
  }
  // 3. If file not found, check if it's a directory lacking trailing slash
  else if (!fs.existsSync(targetPath)) {
    const withIndex = path.join(targetPath, "index.html");
    if (fs.existsSync(withIndex)) {
      targetPath = withIndex;
    }
  }

  // If still not found or remains a directory, return 404
  if (!fs.existsSync(targetPath) || fs.statSync(targetPath).isDirectory()) {
    return new NextResponse("Benchmark file not found", { status: 404 });
  }

  // Determine appropriate content type
  const ext = path.extname(targetPath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".mjs": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".otf": "font/otf",
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".txt": "text/plain; charset=utf-8",
    ".md": "text/markdown; charset=utf-8",
  };

  const contentType = mimeTypes[ext] || "application/octet-stream";
  const fileBuffer = fs.readFileSync(targetPath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
