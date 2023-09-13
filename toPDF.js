require("dotenv").config();
const puppeteer = require("puppeteer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const toHTML = require("./toHTML");

async function getStaticHTML(inputFilePath) {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  const url = "file://" + path.resolve(inputFilePath);
  await page.goto(url, { waitUntil: "networkidle0" });

  const staticHTML = await page.content();

  await browser.close();

  return staticHTML;
}

async function convertHTMLtoPDF(htmlContent, outputPdf, isTest = true) {
  config = {
    url: "https://api.docraptor.com/docs",
    method: "post",
    responseType: "arraybuffer",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      user_credentials: process.env.API_KEY,
      doc: {
        test: isTest,
        document_type: "pdf",
        document_content: htmlContent,
        javascript: true,
        prince_options: {
          media: "print",
        },
      },
    },
  };

  return axios(config) // Return the Promise here
    .then(function (response) {
      return new Promise((resolve, reject) => {
        // Create a new Promise
        fs.writeFile(outputPdf, response.data, "binary", function (writeErr) {
          if (writeErr) reject(writeErr);
          console.log(`Saved ${outputPdf}!`);
          resolve(); // Resolve the Promise when the operation is done
        });
      });
    })
    .catch(function (error) {
      var decoder = new TextDecoder("utf-8");
      console.log(decoder.decode(error.response.data));
    });
}

async function main() {
  const filePath = process.argv[2];
  const isTest = process.argv[3] !== "false";

  if (!filePath) {
    console.log("Please provide a file path");
    process.exit(1);
  }

  let htmlPath = path.join(__dirname, filePath).replace(/\\/g, "/");
  let outputPdf = path.join(
    __dirname,
    path.basename(htmlPath, path.extname(htmlPath)) + ".pdf"
  );

  if (path.extname(filePath) === ".md") {
    htmlPath = await toHTML(filePath);
  }

  getStaticHTML(htmlPath)
    .then((htmlContent) => {
      console.log("HTML converted successfully");
      return convertHTMLtoPDF(htmlContent, outputPdf, isTest);
    })
    .then(() => {
      // If the original file was a Markdown file, delete the generated HTML file
      if (path.extname(filePath) === ".md") {
        return new Promise((resolve, reject) => {
          fs.unlink(htmlPath, (err) => {
            if (err) reject(err);
            console.log(`Deleted ${htmlPath}!`);
            resolve(); // Resolve the Promise when the operation is done
          });
        });
      }
    })
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error("Error:", error);
      process.exit(1);
    });
}

main();
