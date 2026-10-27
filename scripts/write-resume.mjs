import { writeFileSync } from "node:fs";

const lines = [
  [22, "JYOTI AGARWAL"],
  [11, "Full-Stack Developer | AI Creator | Digital Creative"],
  [11, "Founder of Shivonix"],
  [10, "Email: contactjyotiiagarwal@gmail.com"],
  [10, "Phone: +91 74174 10098"],
  [10, "LinkedIn: linkedin.com/in/jyoti-agarwal-a01663402"],
  [10, "Portfolio URL: CONFIRM before sending"],
  [8, ""],
  [13, "SUMMARY"],
  [10, "Developer with more than one year of frontend experience and a"],
  [10, "growing focus on full-stack application development. I build"],
  [10, "responsive interfaces and connect applications to APIs and databases."],
  [8, ""],
  [13, "EXPERIENCE"],
  [11, "Founder - Shivonix"],
  [10, "Dates: CONFIRM start date - Present"],
  [10, "Web, commerce, and creative digital work under the Shivonix name."],
  [11, "Frontend development"],
  [10, "More than one year. Employer and exact dates: CONFIRM"],
  [10, "Responsive interfaces and practical digital products."],
  [8, ""],
  [13, "SELECTED WORK"],
  [11, "Milieu Solar - milieu.com.my"],
  [10, "Public website for a Malaysian solar company."],
  [10, "My specific contribution: CONFIRM"],
  [11, "Disruptive Doctors"],
  [10, "Reference link on file. Public details: CONFIRM"],
  [8, ""],
  [13, "SKILLS"],
  [10, "Daily: HTML, CSS, JavaScript, responsive interfaces, APIs."],
  [10, "Exploring: React, Next.js, databases, design, content, AI tools."],
  [10, "Edit this list before sending. Delete anything you do not use."],
  [8, ""],
  [13, "EDUCATION"],
  [10, "CONFIRM institution, credential, and dates. None are claimed here."],
  [8, ""],
  [9, "Template only. Replace every CONFIRM line before you send this file."],
];

function escapePdf(value) {
  return value.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

let y = 750;
let stream = "BT\n/F1 11 Tf\n";
for (const [size, text] of lines) {
  if (!text) {
    y -= 8;
    continue;
  }
  stream += `/F1 ${size} Tf\n1 0 0 1 54 ${y} Tm\n(${escapePdf(text)}) Tj\n`;
  y -= size + 6;
}
stream += "ET";

const objects = [];
function add(body) {
  objects.push(body);
  return objects.length;
}

add("<< /Type /Catalog /Pages 2 0 R >>");
add("<< /Type /Pages /Kids [3 0 R] /Count 1 >>");
add("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>");
add(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`);
add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

let pdf = "%PDF-1.4\n";
const offsets = [0];
objects.forEach((body, index) => {
  offsets.push(Buffer.byteLength(pdf));
  pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
});
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
for (let i = 1; i < offsets.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;

writeFileSync(new URL("../public/resume/Jyoti-Agarwal-Resume.pdf", import.meta.url), pdf);
console.log("Wrote resume PDF");
