import { cp, mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const BENCHMARK_DIR = "/home/riftyxso/Documents/benchmark";
const PUBLIC_BENCHMARKS = "/home/riftyxso/porto/public/benchmarks";

const TARGETS = [
  {
    name: "capys",
    source: join(BENCHMARK_DIR, "capys/web/out"),
    dest: join(PUBLIC_BENCHMARKS, "capys"),
    baseHref: "/benchmarks/capys/",
  },
  {
    name: "waretrack-astra",
    source: join(BENCHMARK_DIR, "gpt 6 astra max/dist"),
    dest: join(PUBLIC_BENCHMARKS, "waretrack-astra"),
    baseHref: "/benchmarks/waretrack-astra/",
  },
  {
    name: "waretrack-sol",
    source: join(BENCHMARK_DIR, "gpt 6.1 sol/dist"),
    dest: join(PUBLIC_BENCHMARKS, "waretrack-sol"),
    baseHref: "/benchmarks/waretrack-sol/",
  },
  {
    name: "pear",
    source: join(BENCHMARK_DIR, "clone web test/dist"),
    dest: join(PUBLIC_BENCHMARKS, "pear"),
    baseHref: "/benchmarks/pear/",
  },
  {
    name: "shopify-editions",
    source: join(BENCHMARK_DIR, "clone web test/clone 2/dist"),
    dest: join(PUBLIC_BENCHMARKS, "shopify-editions"),
    baseHref: "/benchmarks/shopify-editions/",
  },
];

async function bundle() {
  console.log("Starting benchmark asset bundling into public/benchmarks/...");

  for (const target of TARGETS) {
    console.log(`\nProcessing [${target.name}]...`);
    if (!existsSync(target.source)) {
      console.error(`Source not found: ${target.source}`);
      continue;
    }

    // Clean existing destination if any
    try {
      await rm(target.dest, { recursive: true, force: true });
    } catch {}

    await mkdir(target.dest, { recursive: true });

    // Copy entire folder recursively
    console.log(`Copying from ${target.source} to ${target.dest}...`);
    await cp(target.source, target.dest, { recursive: true });

    // Patch index.html to ensure relative asset resolution
    const indexPath = join(target.dest, "index.html");
    if (existsSync(indexPath)) {
      console.log(`Patching ${indexPath} with baseHref ${target.baseHref}...`);
      let html = await readFile(indexPath, "utf-8");

      // Replace absolute root paths with relative paths
      html = html.replace(/(src|href)=["']\/assets\//g, '$1="./assets/');
      html = html.replace(/(src|href)=["']\/_next\//g, '$1="./_next/');
      html = html.replace(/(src|href)=["']\/images\//g, '$1="./images/');
      html = html.replace(/(src|href)=["']\/fonts\//g, '$1="./fonts/');
      html = html.replace(/(src|href)=["']\/favicon\.svg["']/g, '$1="./favicon.svg"');
      html = html.replace(/(src|href)=["']\/styles\.css["']/g, '$1="./styles.css"');
      html = html.replace(/(src|href)=["']\/app\.js["']/g, '$1="./app.js"');
      html = html.replace(/(src|href)=["']\/local\.js["']/g, '$1="./local.js"');
      html = html.replace(/(src|href)=["']\/icon\.svg/g, '$1="./icon.svg');

      // Inject <base href="..."> after <head> if not already present
      if (!html.includes("<base href=")) {
        html = html.replace(/<head([^>]*)>/i, `<head$1>\n    <base href="${target.baseHref}" />`);
      }

      await writeFile(indexPath, html, "utf-8");
      console.log(`Successfully patched [${target.name}] index.html`);
    }
  }

  console.log("\nAll 5 multi-file benchmarks successfully bundled into public/benchmarks/!");
}

bundle().catch(console.error);
