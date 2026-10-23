# DevFlow Kit

<div align="center">

<img src="assets/logo.svg" width="104" alt="DevFlow Kit logo">

# Less busywork. More building.

**A focused, privacy-first workspace for everyday developer tasks.**  
Thirteen practical utilities. One lightweight interface. No account. No app backend.

<p>
  <a href="https://github.com/amirreza91-13/devflow-kit/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/amirreza91-13/devflow-kit/validate.yml?style=for-the-badge&label=CI" alt="CI status"></a>
  <img src="https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111" alt="JavaScript">
  <img src="https://img.shields.io/badge/HTML5-semantic-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-responsive-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/Node.js-tests-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/License-MIT-A6F36B?style=for-the-badge" alt="MIT License">
</p>

[Explore the code](https://github.com/amirreza91-13/devflow-kit) · [Report a bug](https://github.com/amirreza91-13/devflow-kit/issues) · [Request a utility](https://github.com/amirreza91-13/devflow-kit/issues/new)

</div>

---

## ✦ The idea

Developers constantly switch between small utilities to format data, inspect tokens, convert values, and compare text. DevFlow Kit brings these everyday tasks into one calm, responsive workspace.

It is deliberately built with **vanilla JavaScript, semantic HTML, and CSS**—without a frontend framework, external runtime dependency, application server, database, or account system.

## ⚡ The toolkit

| Utility | What it does |
|---|---|
| **JSON Formatter** | Validate, pretty-print, and minify JSON |
| **URL Encoder / Decoder** | Encode or decode URL components |
| **JWT Decoder** | Inspect a token's header and payload without claiming to verify it |
| **UUID Generator** | Generate UUID v4 identifiers using browser cryptography |
| **Base64 Encoder / Decoder** | Convert UTF-8 text to and from Base64 |
| **Unix Timestamp** | Convert seconds or milliseconds into readable dates |
| **Text Case Converter** | Convert between camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE |
| **Regex Tester** | Inspect matches and capture groups in a worker with a timeout |
| **Text Diff** | Compare two texts line by line |
| **HTML Entity Converter** | Encode and decode common HTML entities |
| **CSS Color Converter** | Convert HEX, RGB, and HSL colors |
| **Markdown Preview** | Preview a deliberately limited, safe subset of Markdown as plain text |
| **HTTP Status Reference** | Search common HTTP response codes |

## ◈ Design principles

- **Privacy-first:** transformations happen in your browser; the app has no application backend and does not intentionally transmit tool inputs.
- **Small by design:** plain HTML, CSS, and JavaScript—no framework runtime or production build step.
- **Useful over flashy:** searchable utilities, consistent controls, keyboard-friendly navigation, and responsive layouts.
- **Security-aware:** clear limitations for JWT decoding, bounded regex inputs, and no arbitrary HTML rendering in the Markdown preview.
- **Testable:** core transformations are covered by Node's built-in test runner and checked in GitHub Actions.

## 🛠 Technology stack

<div align="center">

| Technology | Role |
|:--:|---|
| <img src="https://cdn.simpleicons.org/html5/E34F26" width="34" alt="HTML5"> **HTML5** | Semantic application structure |
| <img src="https://cdn.simpleicons.org/css3/1572B6" width="34" alt="CSS3"> **CSS3** | Responsive layout and visual system |
| <img src="https://cdn.simpleicons.org/javascript/F7DF1E" width="34" alt="JavaScript"> **JavaScript** | Utilities and interface behavior |
| <img src="https://cdn.simpleicons.org/nodedotjs/339933" width="34" alt="Node.js"> **Node.js** | Syntax checks and automated tests |
| <img src="https://cdn.simpleicons.org/github/FFFFFF" width="34" alt="GitHub" onerror="this.style.display='none'"> **GitHub Actions** | Continuous integration |
| <img src="assets/logo.svg" width="34" alt="DevFlow Kit"> **Web APIs** | Clipboard, Web Crypto, Workers, TextEncoder |

</div>

## 🚀 Run it locally

The app uses JavaScript ES modules and a Web Worker. **Do not open `index.html` directly as a `file://` URL**: browsers commonly block module imports and workers in that context, which can leave the interface stuck on “Loading tools…”.

### Option A — Python (no package installation)

1. Download and extract the ZIP, or clone this repository.
2. Open PowerShell in the project folder.
3. Run:

   ```powershell
   py -m http.server 8000
   ```

   If `py` is unavailable, try:

   ```powershell
   python -m http.server 8000
   ```

4. Open **http://localhost:8000** in your browser.
5. Stop the local server with `Ctrl+C` when finished.

### Option B — Node.js

With Node.js installed, run:

```powershell
npx --yes serve .
```

Open the local URL printed in the terminal.

## 🧪 Development and tests

Requirements: Node.js 20 or newer. The app itself does not need a build step or dependency installation.

```bash
npm run check
npm test
```

- `npm run check` checks JavaScript syntax.
- `npm test` runs the core utility tests with Node's built-in test runner.
- GitHub Actions runs both commands for pushes to `main`, pull requests, and manual workflow dispatch.

The validation workflow **does not deploy or publish the website**.

## 🔐 Privacy and security notes

- Inputs are processed in the browser; the app has no application backend and does not intentionally transmit tool inputs.
- Avoid entering passwords, private keys, production credentials, or sensitive customer data into any browser utility unless you understand the risk.
- **JWT decoding is not JWT verification.** Signatures, issuer, audience, expiry, and authenticity are not verified. Decoded claims are untrusted.
- Regex matching runs in a dedicated Web Worker with a 500 ms timeout and input limits. This reduces the chance of a slow pattern freezing the interface, but cannot make every expression harmless.
- UUIDs use the Web Crypto API rather than `Math.random()`.
- The Markdown utility produces plain text and does not render arbitrary HTML.

## 🗂 Project structure

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
└── LICENSE
```

## 🧭 Project status

DevFlow Kit is a lightweight utility project with automated checks and unit tests. Passing tests confirm the covered cases; they do not replace manual testing of every browser interaction.

## 📄 License

Released under the MIT License. See [LICENSE](LICENSE).
