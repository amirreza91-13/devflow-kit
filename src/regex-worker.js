import { findRegexMatches } from "./core.js";

self.addEventListener("message", (event) => {
  const { pattern, flags, text } = event.data ?? {};
  try {
    const result = findRegexMatches(String(pattern ?? ""), String(flags ?? ""), String(text ?? ""));
    self.postMessage({ result });
  } catch (error) {
    self.postMessage({ error: error?.message || "Regex evaluation failed." });
  }
});
