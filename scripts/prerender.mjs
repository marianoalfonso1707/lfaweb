import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";
import { preview } from "vite";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const port = 4179;
const origin = `http://127.0.0.1:${String(port)}`;

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.PUPPETEER_EXECUTABLE_PATH,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ].filter(Boolean);
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  throw new Error("Chrome/Edge not found. Set CHROME_PATH.");
}

async function snapshot(browser, route, outfile) {
  const page = await browser.newPage();
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.evaluateOnNewDocument(() => {
    window.__LFA_PRERENDER__ = true;
  });
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${origin}${route}`, { waitUntil: "networkidle0", timeout: 90_000 });
  await page.waitForFunction(
    () =>
      document.documentElement.dataset.seoReady === "1" &&
      document.querySelector("#pricing") !== null &&
      document.querySelectorAll("h2").length >= 7,
    { timeout: 60_000 },
  );
  await new Promise((resolve) => setTimeout(resolve, 400));
  const html = await page.content();
  fs.mkdirSync(path.dirname(outfile), { recursive: true });
  fs.writeFileSync(outfile, `<!DOCTYPE html>\n${html.replace(/^<!DOCTYPE html>/i, "").trim()}\n`);
  await page.close();
  console.log(`prerendered ${route} → ${path.relative(rootDir, outfile)}`);
}

const server = await preview({
  root: rootDir,
  preview: { port, host: "127.0.0.1", open: false },
});

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: true,
  args: ["--no-sandbox", "--disable-gpu", "--font-render-hinting=none"],
});

try {
  await snapshot(browser, "/", path.join(distDir, "index.html"));
  await snapshot(browser, "/pt/", path.join(distDir, "pt", "index.html"));
} finally {
  await browser.close();
  await server.close();
}
