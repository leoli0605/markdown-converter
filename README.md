# Markdown Converter

This is a simple markdown converter that converts markdown files to HTML files.

And based on the [@shd101wyy/mume](https://github.com/shd101wyy/mume) package, I made adjustments according to my own needs.

We use `prince` to convert to PDF instead of `puppeteer` because is not support convert TOC to the PDF bookmarks.

### Installation

```bash
npm install
```

### Usage

```bash
node markdown2html.js <markdown file path>
```

### Example

```bash
node markdown2html.js test\markdown.md
```

### TODO

- [ ] Use `puppeteer` to convert to PDF and find a workaround way to support TOC to the PDF bookmarks.

---

```mermaid
flowchart LR

A[Hard] -->|Text| B(Round)
B --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
```

```mermaid
pie
"Dogs" : 386
"Cats" : 85.9
"Rats" : 15
```

```mermaid
gantt
    section Section
    Completed :done,    des1, 2014-01-06,2014-01-08
    Active        :active,  des2, 2014-01-07, 3d
    Parallel 1   :         des3, after des1, 1d
    Parallel 2   :         des4, after des1, 1d
    Parallel 3   :         des5, after des3, 1d
    Parallel 4   :         des6, after des4, 1d
```