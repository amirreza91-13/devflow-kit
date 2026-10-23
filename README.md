# DevFlow Kit

<div align="center">

<img src="assets/logo.svg" width="84" alt="DevFlow Kit logo">

### Small tools. Smoother flow.

**Thirteen everyday developer utilities in a privacy-first, browser-based workspace.**

[Repository](https://github.com/amirreza91-13/devflow-kit) · [Issues](https://github.com/amirreza91-13/devflow-kit/issues)

</div>

---

## What is it?

DevFlow Kit collects common formatting, encoding, conversion, inspection, comparison and reference tasks in one responsive interface. It is a static web application: no account, app server, database, framework runtime or third-party JavaScript library is required.

## Utilities

| Utility | Capabilities |
|---|---|
| JSON Formatter | Validate, pretty-print and minify JSON |
| URL Encoder / Decoder | Encode/decode URL components |
| JWT Decoder | Decode header and payload for inspection |
| UUID Generator | Generate UUID v4 identifiers using browser cryptography |
| Base64 | UTF-8-safe Base64 encoding and decoding |
| Unix Timestamp | Convert seconds/milliseconds to ISO and local time |
| Text Case Converter | camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE |
| Regex Tester | Inspect matches and capture groups |
| Text Diff | Line-level additions and removals |
| HTML Entity Converter | Encode/decode common named and numeric entities |
| CSS Color Converter | Convert HEX/RGB/HSL to HEX, RGB and HSL |
| Markdown Preview | Plain-text preview for a limited Markdown subset |
| HTTP Status Codes | Search a curated list of common response codes |

## Privacy and security

- Inputs are processed in the browser; the app has no application backend and does not intentionally transmit tool inputs.
- Avoid entering passwords, private keys, production credentials, or sensitive customer data into any online utility.
- **JWT decoding is not JWT verification.** This tool does not verify signatures or validate issuer, audience, expiry, or other claims. Decoded data is untrusted.
- Regex evaluation runs in a dedicated Web Worker with a 500 ms timeout and input limits. This reduces the risk of a slow pattern freezing the interface, but complex expressions can still time out.
- UUIDs use the Web Crypto API rather than Math.random().
- The Markdown tool emits plain text and does not render arbitrary HTML.

## Run locally

Requirements: a modern browser. Node.js 20+ is needed only for automated tests.

1. Clone or download this repository.
2. Serve the folder over localhost (recommended for browser security APIs), for example with `npx serve .`.
3. Open the local URL printed by the server.

No production build or package installation is needed for the static app itself.

## Development

```bash
npm run check
npm test
```

The tests use Node's built-in test runner and cover core transformations plus important edge cases. CI syntax-checks the app, core utilities and regex worker. Automated tests do not replace manual browser checks of the UI.

## Structure

```text
devflow-kit/
├── .github/workflows/validate.yml
├── assets/logo.svg
├── src/
│   ├── app.js
│   ├── core.js
│   └── regex-worker.js
├── tests/core.test.mjs
├── index.html
├── styles.css
├── package.json
├── LICENSE
└── README.md
```

## Continuous integration

GitHub Actions runs syntax checks and unit tests on pushes to `main`, pull requests, and manual workflow dispatch. The workflow validates code only; it does not publish or deploy the application.

## Current quality status

The repository includes automated unit tests for core functions and CI checks. Check the Actions tab for the actual latest run result before describing a release as verified. A passing unit suite does not prove every browser interaction has been manually tested.

## License

MIT. See [LICENSE](LICENSE).
