const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Normalize line endings to \n
code = code.replace(/\r\n/g, '\n');

function extractAndRemove(startStr, endStr) {
  const startIdx = code.indexOf(startStr);
  if (startIdx === -1) throw new Error("Could not find start: " + startStr.substring(0, 50));
  const endIdx = code.indexOf(endStr, startIdx) + endStr.length;
  if (code.indexOf(endStr, startIdx) === -1) throw new Error("Could not find end: " + endStr.substring(0, 50));
  const chunk = code.slice(startIdx, endIdx);
  code = code.slice(0, startIdx) + code.slice(endIdx);
  return chunk;
}

try {
  // 1. Move Why Choose Us to before Project Highlights
  const wcuStart = '<section className="relative py-20 overflow-hidden">';
  const wcuEnd = '          </div>\n        </section>\n';
  let wcuChunk = extractAndRemove(wcuStart, wcuEnd);
  wcuChunk = wcuChunk.replace('<section className="relative py-20 overflow-hidden">', '<section id="highlights" className="relative py-20 overflow-hidden">');

  const projIdx = code.indexOf('{/* ── PROJECT HIGHLIGHTS ───────────────────────────────── */}');
  code = code.slice(0, projIdx) + wcuChunk + code.slice(projIdx);

  // 2. Extract Floor Plans
  const fpStart = '{/* Floor Plans Section — SEO semantic section';
  const fpEnd = '              </FadeIn>\n            </section>\n';
  let fpChunk = extractAndRemove(fpStart, fpEnd);

  fpChunk = fpChunk.replace('className="mt-20"', 'className="max-w-[1180px] mx-auto px-6 sm:px-8 py-20"');

  // Insert Floor Plans before gallery
  const galIdx = code.indexOf('        <section id="gallery"');
  code = code.slice(0, galIdx) + '        ' + fpChunk + code.slice(galIdx);

  fs.writeFileSync('src/App.tsx', code);
  console.log('Reordered Successfully');
} catch (e) {
  console.error(e.message);
}
