---
html:
  embed_local_images: true # 將所有的本地圖片嵌入為 base64 格式
  embed_svg: true
  offline: false
  toc: true

toc:
  depth_from: 2
  depth_to: 6
  ordered: false
---

<STYLE>
  @page {
      size: A4;
      background: url("https://www.tyrafos.cn/wp-content/uploads/2020/03/2020031316463381.png");
      background-position: 1.9cm 20px;
      background-size: 15%;
      background-repeat: no-repeat;
      @top-center {
          font-size: 10.5pt;
          content: "<input title here>";
      }
      @top-right {
          font-size: 10.5pt;
          content: "version: 1.0";
      }
      @bottom-left {
          font-size: 10.5pt;
          content: "© Guangzhou Tyrafos Semiconductor Technologies Co., Ltd – Confidential & Proprietary";
      }
      @bottom-right {
          font-size: 10.5pt;
          content: "Page " counter(page) " of " counter(pages);
      }
  }
</STYLE>

<STYLE>
  .markdown-preview.markdown-preview {
    font-family: 'Arial', sans-serif, 'Microsoft JhengHei UI', sans-serif;
    font-size: 11pt;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Times New Roman', serif, 'Microsoft JhengHei UI', serif;
  }

  h2 {
    /* display: none; */
    overflow: hidden;
    width: 0px;
    height: 0px;
  }

  .WaveDrom {
    width: 100%;
    max-width: 100%;
    display: none;
  }

  .puml {
    display: flex;
    display: none;
  }

  .language- {
      font-family: 'Roboto', sans-serif, 'Noto Sans TC', sans-serif;
      display: none;
  }

  html body .no-border-table table td, html body .no-border-table table th {
    // border: 1px solid #850000;
    border: none;
    padding: 0px 0px;
  }

  .image-center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    /* width: 50%; */
  }

  .content {
    white-space: pre-line;
    display: block;
    /* border: 1px solid; */
  }

  html body ul, html body ol {
    margin-left: 0;
  }
  .katex .tag {
    position: relative;
    right: 0;
    display: none;
  }
</STYLE>
