# CMH GLSLCanvas Studio

本專案以 [Astro](https://astro.build/) 為基礎，  
用於展示、編輯與教學 GLSL shader 作品，並支援 Markdown/MDX 內容管理與互動排版。

---

## 🚀 專案架構

```
/
├── public/                # 靜態資源（圖片、JS、favicon 等）123
├── src/
│   ├── assets/            # Astro 圖片資源
│   ├── components/        # 共用 React/Astro 元件
│   ├── data/
│   │   ├── craft/         # Markdown 作品（自動渲染於 craft index，並生成動態頁面）
│   │   └── showcase/      # MDX 作品（自動渲染於 showcase index，並生成動態頁面）
│   ├── layouts/           # Astro 版型
│   ├── pages/             # Astro 頁面
│   ├── shader/            # GLSL shader 檔案（供 craft 作品 frontmatte shader:{} 調用，生成 GLSL Canvas）
│   ├── styles/            # 全域與元件樣式（CSS/SCSS）
│   └── utils/             # 工具函式
├── astro.config.mjs       # Astro 設定
├── package.json           # 專案依賴與指令
├── tsconfig.json          # TypeScript 設定
└── README.md
```

---

## 📦 主要功能

- **Craft**：`src/data/craft/` 
  - 教學用的效果範例。
  - `frontmatter` 的 `shader: src` 指定 glsl canvas 要讀取的 fragment ；`shader: textures` 可以給 glsl canvas 讀取圖片。
  - 透過動態路由生成個別作品頁。
- **Showcase**：`src/data/showcase/` 
  - 過去同學的創作。
  - 使用 MDX 格式編輯，可插入 React 元件。
  - 透過動態路由生成個別作品頁。
- **GLSL Shader Canvas**：`src/shader/` 內的 shader 檔案主要提供給 craft 作品調用，並在頁面上生成 GLSL Canvas 實時互動展示。
- **RWD 支援**：所有作品頁面皆支援響應式排版。
- **圖片、按鈕、互動元件**：支援自訂 React 元件於 MDX 內容中混用。

---

## 🧞 指令

在專案根目錄下執行：

| 指令                      | 功能說明                                         |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | 安裝所有依賴套件                                 |
| `npm run dev`             | 啟動本地開發伺服器（預設 http://localhost:4321） |
| `npm run build`           | 建置生產環境檔案至 `./dist/`                     |
| `npm run preview`         | 本地預覽建置後的網站                             |
| `npm run astro ...`       | 執行 Astro CLI 指令                              |
| `npm run astro -- --help` | 查看 Astro CLI 說明                              |

---

## 👀 延伸閱讀

- [Astro 官方文件](https://docs.astro.build)
- [GLSLCanvas](https://github.com/patriciogonzalezvivo/glslCanvas)
- [The Book of Shaders](https://thebookofshaders.com)

---

本專案由「演算美學實驗室」維護，歡迎參與與交