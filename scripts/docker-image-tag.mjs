import { readFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const [major, minor] = packageJson.version.split(".");

if (!major || !minor) {
  throw new Error(`Invalid package version: ${packageJson.version}`);
}

const formatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Sao_Paulo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const date = formatter.format(new Date());
const tag = `${date}_v${major}.${minor}`;

if (!/^\d{4}-\d{2}-\d{2}_v\d+\.\d+$/.test(tag)) {
  throw new Error(`Invalid Docker image tag generated: ${tag}`);
}

console.log(tag);
