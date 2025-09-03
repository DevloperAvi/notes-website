// script.js
// Auto-uses 'pdfs/list.json' if present (push this file when you upload new PDFs).
// Otherwise edit the `manualPdfs` array below.

const manualPdfs = [
  { title: "Sample Note 1 - 2025-09-04", file: "pdfs/sample1.pdf" },
  { title: "Sample Note 2 - 2025-09-04", file: "pdfs/sample2.pdf" }
];

const listElement = document.getElementById("pdf-list");

async function loadAndRender() {
  let pdfs = manualPdfs;
  try {
    const resp = await fetch('pdfs/list.json', {cache: "no-store"});
    if (resp.ok) {
      const data = await resp.json();
      if (Array.isArray(data) && data.length) {
        pdfs = data;
      }
    }
  } catch (err) {
    // ignore and fallback to manual list
    console.log("No list.json found or failed to fetch, using manual list.");
  }

  if (!pdfs.length) {
    listElement.innerHTML = '<div class="alert alert-warning">No PDF notes found. Add files to the <code>pdfs/</code> folder and update <code>pdfs/list.json</code> or edit <code>script.js</code>.</div>';
    return;
  }

  // render list
  listElement.innerHTML = '';
  pdfs.forEach(item => {
    const a = document.createElement('a');
    a.className = "list-group-item list-group-item-action d-flex justify-content-between align-items-center";
    a.href = item.file;
    a.target = "_blank";
    a.rel = "noopener";
    a.innerHTML = `<div>
                    <strong>${item.title}</strong><br/>
                    <small class="text-muted">${item.date || ''}</small>
                   </div>
                   <div>
                    <a class="btn btn-sm btn-outline-primary me-2" href="${item.file}" target="_blank" rel="noopener">View</a>
                    <a class="btn btn-sm btn-primary" href="${item.file}" download>Download</a>
                   </div>`;
    listElement.appendChild(a);
  });
}

loadAndRender();
