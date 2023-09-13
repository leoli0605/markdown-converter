#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const wkhtmltopdf = require("wkhtmltopdf");

const filePath = process.argv[2];
if (!filePath) {
  console.error("Please provide the filePath parameter.");
  process.exit(1);
}

const htmlPath = path.join(__dirname, filePath).replace(/\\/g, "/");
const outputPdf = path.join(
  __dirname,
  path.basename(filePath, ".html") + ".pdf"
);

// 讀取本地 HTML 文件的內容
const htmlContent = fs.readFileSync(htmlPath, "utf8");

wkhtmltopdf(htmlContent, { pageSize: "letter" }).pipe(
  fs.createWriteStream(outputPdf)
);
