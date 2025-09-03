# Avi's Daily Notes - GitHub Pages Template

This simple static website displays PDF notes that you upload to the `pdfs/` folder.

## How to use

1. Create a GitHub repository (example: `avi-notes`) and enable **GitHub Pages** from the repository **Settings** (use the `main` branch / `root` folder).
2. Upload the contents of this folder to the repository root:
   - `index.html`
   - `script.js`
   - `style.css`
   - `pdfs/` (folder with your PDFs)
3. **Option A (recommended)**: Maintain a `pdfs/list.json` file containing an array of PDF metadata. Example:
```json
[
  { "title": "Note 1 - 2025-09-04", "file": "pdfs/2025-09-04-note1.pdf", "date": "2025-09-04" },
  { "title": "Note 2 - 2025-09-04", "file": "pdfs/2025-09-04-note2.pdf", "date": "2025-09-04" }
]
```
Push `list.json` and your PDF files. The website will read `list.json` and display the list automatically.

4. **Option B (manual)**: If you prefer not to use `list.json`, edit `script.js` and add entries to the `manualPdfs` array.

## Tips
- Put PDFs in the `pdfs/` folder and give them descriptive names.
- Each time you add new PDFs, commit & push to GitHub. GitHub Pages will update the site.
- If you want automatic listing without maintaining `list.json`, you'll need a server-side script or GitHub Action to regenerate `list.json` when new files are added. I can help create that if you want.

