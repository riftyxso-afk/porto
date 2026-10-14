import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

function syncBenchmarks() {
  const benchmarkDir = "/home/riftyxso/Documents/benchmark";
  const publicDir = path.join(process.cwd(), "public/benchmarks");
  if (!fs.existsSync(benchmarkDir)) return;

  const targets = [
    {
      name: "capys",
      src: path.join(benchmarkDir, "capys/web/out"),
      dest: path.join(publicDir, "capys"),
      base: "/benchmarks/capys/",
    },
    {
      name: "waretrack-astra",
      src: path.join(benchmarkDir, "gpt 6 astra max/dist"),
      dest: path.join(publicDir, "waretrack-astra"),
      base: "/benchmarks/waretrack-astra/",
    },
    {
      name: "waretrack-sol",
      src: path.join(benchmarkDir, "gpt 6.1 sol/dist"),
      dest: path.join(publicDir, "waretrack-sol"),
      base: "/benchmarks/waretrack-sol/",
    },
  ];

  for (const t of targets) {
    if (!fs.existsSync(t.src)) continue;
    const indexDest = path.join(t.dest, "index.html");
    if (!fs.existsSync(indexDest)) {
      try {
        fs.mkdirSync(t.dest, { recursive: true });
        fs.cpSync(t.src, t.dest, { recursive: true });
        if (fs.existsSync(indexDest)) {
          let html = fs.readFileSync(indexDest, "utf8");
          html = html.replace(/(src|href)=["']\/assets\//g, '$1="./assets/');
          html = html.replace(/(src|href)=["']\/_next\//g, '$1="./_next/');
          html = html.replace(/(src|href)=["']\/images\//g, '$1="./images/');
          html = html.replace(/(src|href)=["']\/fonts\//g, '$1="./fonts/');
          html = html.replace(/(src|href)=["']\/favicon\.svg["']/g, '$1="./favicon.svg"');
          html = html.replace(/(src|href)=["']\/styles\.css["']/g, '$1="./styles.css"');
          html = html.replace(/(src|href)=["']\/app\.js["']/g, '$1="./app.js"');
          html = html.replace(/(src|href)=["']\/local\.js["']/g, '$1="./local.js"');
          html = html.replace(/(src|href)=["']\/icon\.svg/g, '$1="./icon.svg');
          if (!html.includes("<base href=")) {
            html = html.replace(/<head([^>]*)>/i, `<head$1>\n    <base href="${t.base}" />`);
          }
          fs.writeFileSync(indexDest, html, "utf8");
        }
      } catch (err) {
        console.error("Error syncing benchmark", t.name, err);
      }
    }
  }
}

syncBenchmarks();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
