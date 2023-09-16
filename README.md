# Markdown Converter

This is a simple markdown converter that converts markdown files into HTML and PDF files. It is based on the [@shd101wyy/mume](https://github.com/shd101wyy/mume) package, with adjustments made to suit specific needs for converting markdown files into HTML.

This tool utilizes `puppeteer` for converting HTML into static HTML files, and the online server [DocRaptor](https://docraptor.com/) for converting to PDF files. The reason for using `DocRaptor` is its engine, `Prince`, which supports the Table of Contents (TOC) feature. However, since `Prince` is not free, `DocRaptor` is used as it offers 5 free PDF conversions per month, and unlimited test PDF files.

## Requirements

- [Node.js](https://nodejs.org/en/) >= v18.16.0

## Installation

```bash
npm install
```

## Usage

- To convert markdown to HTML:

  ```shell
  node toHTML.js <markdown file path>
  ```

- To convert markdown or HTML to PDF:

  ```shell
  node toPDF.js <markdown or HTML file path> <test mode>
  ```

  The second parameter indicates whether to use `test` mode. If it is set to `true`, the `test` mode will be activated, and the resulting PDF file will contain a watermark. However, it is free and unlimited. If it is set to `false`, the `production` mode will be activated, and the resulting PDF file will not contain a watermark. However, it is limited to 5 free PDF files per month.

## TODO

- [ ] There are still some issues when converting SVG to PDF, which need to be addressed.
  - Since `Prince` does not support SVG with `foreignObject` elements.
  - [LINK1](https://github.com/puppeteer/puppeteer/issues/1778)
  - [LINK2](https://github.com/puppeteer/puppeteer/issues/3625)
- [ ] Add some CSS styles to the HTML file to make it look better.
