// script.js (updated)
const manualPdfs = [
  { title: "Sample Note 1 - 2025-09-04", file: "pdfs/sample1.pdf" },
  // you can put root file entries here too:
  // { title: "MCQs - OS", file: "2025-09-04-mcqs_os.pdf", date: "2025-09-04" }
];

const listElement = document.getElementById("pdf-list");

async function tryFetch(path) {
  try {
    const resp = await fetch(path, { cache: "no-store" });
    if (resp.ok) {
      const data = await resp.json();
      if (Array.isArray(data) && data.length) return data;
    }
  } catch (e) { /* ignore */ }
  return null;
}

async function loadAndRender() {
  let pdfs = null;

  // try pdfs/list.json first (old behavior)
  pdfs = await tryFetch('pdfs/list.json');
  if (!pdfs) {
    // then try list.json in repo root
    pdfs = await tryFetch('list.json');
  }
  if (!pdfs) {
    // fallback to manual list
    pdfs = manualPdfs;
  }

  if (!pdfs || !pdfs.length) {
    listElement.innerHTML = '<div class="alert alert-warning">No PDF notes found.</div>';
    return;
  }

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
