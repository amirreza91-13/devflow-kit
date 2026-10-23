<div align="center">

<img src="assets/logo.svg" width="84" alt="DevFlow Kit logo">

# DevFlow Kit

### Small tools. Smoother flow.

**A privacy-first collection of everyday developer utilities that run directly in your browser.**

[Open the source](https://github.com/amirreza91-13/devflow-kit) · [Report an issue](https://github.com/amirreza91-13/devflow-kit/issues)

</div>

---

## Why DevFlow Kit?

Small repetitive tasks can interrupt a developer's flow. DevFlow Kit brings common formatting, encoding, conversion, inspection, and reference utilities into one lightweight interface—with no account and no application backend.

## Utilities

| Utility | What it does |
|---|---|
| JSON Formatter | Format and validate JSON |
| URL Encoder / Decoder | Encode or decode URL components |
| JWT Decoder | Read JWT header and payload (does **not** verify signatures) |
| UUID Generator | Generate UUID v4 values with the browser crypto API |
| Base64 | UTF-8-aware Base64 encoding and decoding |
| Unix Timestamp | Convert seconds or milliseconds to ISO and local dates |
| Text Case Converter | camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE |
| Regex Tester | Inspect matches and capture groups |
| Text Diff | Compare lines with additions and removals |
| HTML Entity Converter | Encode/decode common HTML entities |
| CSS Color Converter | HEX/RGB input with HEX, RGB, and HSL output |
| Markdown Preview | Plain-text preview of a small Markdown subset |
| HTTP Status Reference | Search common HTTP status codes |

## Privacy and security

- Utilities are implemented client-side; this app does not intentionally send entered tool data to an application server.
- Do not paste secrets, access tokens, private keys, or sensitive production data into any browser utility unless you understand the risks.
- JWT decoding is **not** JWT validation. A decoded payload can be forged and must not be trusted without server-side signature and claim validation.
- Regex patterns can be computationally expensive. Use patterns and inputs you trust.
- This project is a developer aid, not a security certification.

## Run locally

No build step or package installation is required for the current static version.

1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. For browser APIs that require a secure context, use localhost or HTTPS.

## Project structure

```text
devflow-kit/
├── assets/
│   └── logo.svg
├── .github/
│   └── workflows/
│       └── pages.yml
├── index.html
├── LICENSE
└── README.md
```

## Deployment

The repository includes a GitHub Actions workflow for publishing the static site to GitHub Pages. In the repository settings, enable Pages with **GitHub Actions** as the build and deployment source. The first run may require that setting to be saved.

## Testing status

This initial repository upload has not yet been verified by an automated test suite. The workflow checks out the repository and deploys the static site; it does **not** constitute functional test coverage. Please test each utility in a browser before relying on it for important work.

## License

MIT — see [LICENSE](LICENSE).
