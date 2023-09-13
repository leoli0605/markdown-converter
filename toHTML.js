#!/usr/bin/env node
const path = require("path");
const os = require("os");
const mume = require("@shd101wyy/mume");

/**
 * This function: embed_local_images (embedLocalImages) is "enabled" by default.
 * Original function: htmlExport()'s embed_local_images (embedLocalImages) is "disabled" by default.
 * @param {*} engine
 * @param {*} param1
 * @returns dest if success, error if failure
 */
async function htmlExport_user(
  engine,
  { offline = false, runAllCodeChunks = false }
) {
  const inputString = await mume.utility.readFile(engine.filePath, {
    encoding: "utf-8",
  });
  let html;
  let yamlConfig;
  ({ html, yamlConfig } = await engine.parseMD(inputString, {
    useRelativeFilePath: true,
    hideFrontMatter: true,
    isForPreview: false,
    runAllCodeChunks,
  }));
  const htmlConfig = yamlConfig["html"] || {};
  if ("offline" in htmlConfig) {
    offline = htmlConfig["offline"];
  }

  let embedLocalImages = true; // <= embedLocalImages is enabled by default.
  if ("embed_local_images" in htmlConfig) {
    embedLocalImages = htmlConfig["embed_local_images"];
  }

  let embedSVG = true; // <= embedSvg is enabled by default.
  if ("embed_svg" in htmlConfig) {
    embedSVG = htmlConfig["embed_svg"];
  }

  let dest = engine.filePath;
  const extname = path.extname(dest);
  dest = dest.replace(new RegExp(extname + "$"), ".html");

  html = await engine.generateHTMLTemplateForExport(html, yamlConfig, {
    isForPrint: false,
    isForPrince: false,
    embedLocalImages,
    offline,
    embedSVG,
  });

  // presentation speaker notes
  // copy dependency files
  if (
    !offline &&
    html.indexOf('[{"src":"revealjs_deps/notes.js","async":true}]') >= 0
  ) {
    const depsDirName = path.resolve(path.dirname(dest), "revealjs_deps");
    if (!fs.existsSync(depsDirName)) {
      fs.mkdirSync(depsDirName);
    }
    fs.createReadStream(
      path.resolve(
        extensionDirectoryPath,
        "./dependencies/reveal/plugin/notes/notes.js"
      )
    ).pipe(fs.createWriteStream(path.resolve(depsDirName, "notes.js")));
    fs.createReadStream(
      path.resolve(
        extensionDirectoryPath,
        "./dependencies/reveal/plugin/notes/notes.html"
      )
    ).pipe(fs.createWriteStream(path.resolve(depsDirName, "notes.html")));
  }

  await mume.utility.writeFile(dest, html);
  return dest;
}

async function convertMarkdownToHTML(filePath) {
  const configPath = path.resolve(os.tmpdir(), ".mume");
  await mume.init(configPath);

  const engine = new mume.MarkdownEngine({
    filePath: filePath,
    config: {
      configPath: configPath,
      previewTheme: "one-light.css",
      codeBlockTheme: "default.css",
      printBackground: true,
      enableScriptExecution: true,
    },
  });

  const htmlPath = await htmlExport_user(engine, {
    offline: false,
    runAllCodeChunks: true,
  });

  return htmlPath;
}

async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error("Please provide the filePath parameter.");
    process.exit(1);
  }

  const ext = path.extname(filePath);
  if (ext !== ".md") {
    console.error("The provided file is not a markdown file (.md).");
    process.exit(1);
  }

  await convertMarkdownToHTML(filePath);

  return process.exit();
}

if (require.main === module) {
  main();
}

module.exports = convertMarkdownToHTML;
