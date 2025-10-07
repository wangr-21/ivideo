# iVideo

简体中文说明 — 本地轻量视频展示与播放演示项目。

## 项目概述
iVideo 是一个单页视频展示与播放演示站点，使用静态页面 + 简单前端路由（基于 hash）实现分类浏览、最近添加、我的列表（收藏）、以及模态视频播放。UI 使用自定义 CSS，并使用少量 JavaScript 管理路由与交互。

## 主要功能
- 首页按分类展示视频缩略卡片
- 视频分类页面（电影 / 电视剧 / 综艺 / 纪录片 / 动漫）
- 最近添加页面（按添加时间排序）
- 我的列表（localStorage 持久化收藏）
- 点击卡片播放/查看信息（模态窗口内 playback）
- 导航栏下拉支持点击固定展开（视频分类与个人账户）
- 简易清晰度/信息面板占位（可扩展）

## 运行要求
- 现代浏览器（支持 ES modules）
- 推荐使用本地静态服务器（否则模块与 fetch 路径可能受限）

## 本地运行（推荐）
在项目根目录（d:\ZM\iVideo）打开终端，任选一种方式启动静态服务器：
- **推荐**：安装 Node.js（如果尚未安装）：
  - 访问 Node.js 官网 下载并安装
- 启动服务器：
  - 在项目根目录下运行
node server.js
- 访问应用：
  - 打开浏览器访问 http://localhost:3000

- 使用 Python（如果已安装）：
  - Windows / PowerShell:
    python -m http.server 3000
  - 打开浏览器访问：http://localhost:3000/src/

- 使用 npm 包 http-server（若已安装）：
  npx http-server -c-1 -p 3000
  打开 http://localhost:3000/src/

- 或在 VS Code 中使用 Live Server，确保打开的是 `src/` 目录的 index.html。

注意：项目的可访问入口为 `src/index.html`（脚本模块以 `js/main.js` 为相对路径），因此请将 static root 对准项目的根（若直接服务项目根，请访问 /src/）。

## 路由与使用说明
前端基于 hash 路由，常用路径：
- `#/` — 首页
- `#/categories` — 视频分类概览
- `#/category/{slug}` — 分类页面，例如 `#/category/movie`（movie/tv/show/doc/anime）
- `#/recent` — 最近添加
- `#/list` — 我的列表（收藏）

交互：
- 点击卡片上的播放按钮或信息按钮打开模态播放/详情。
- 在卡片上点击心形按钮可加入/移除“我的列表”（保存在 localStorage）。
- 导航“视频分类”和“个人账户”使用点击固定展开，下拉内部点击不会关闭，下拉外部点击或 Esc 可关闭。

## 关键文件说明
- src/index.html — 主页面（导航、横幅、模态容器）
- src/css/style.css — 全站样式（导航、卡片、模态、响应式等）
- src/css/responsive.css — 响应式样式（如存在）
- src/js/main.js — 主脚本：路由、渲染、下拉逻辑、模态播放、事件委托
- src/js/data.js — 示例视频数据（添加/修改视频数据请编辑此文件）
- assets/ — 图片/视频/其他静态资源（如存在）

## 如何添加/修改视频
编辑 `src/js/data.js`，在导出的数组中添加或修改对象。每个视频对象常用字段：
- id: 唯一字符串
- title: 标题
- category: movie/tv/show/doc/anime
- thumbnail: 缩略图 URL
- description: 描述
- source: (可选) 视频文件 URL（用于播放）
- dateAdded: YYYY-MM-DD
- author, views, duration 等字段为展示用途

修改 data.js 后刷新页面即可生效。

## 常见问题
- 无法播放/立即播放无反应：确认你是通过静态服务器访问 `src/index.html`（而不是直接 file:// 打开），并且浏览器控制台无 404（检查 `js/main.js` 是否被正确加载）。
- 自动播放被浏览器阻止：浏览器策略可能阻止自动播放有声视频，模态打开后若没有播放可手动点击播放按钮。

## 开发与扩展建议
- 把数据替换成后端 API，改用 fetch 动态加载。
- 为视频添加多分辨率源并实现清晰度切换 UI。
- 增加分页 / 无限滚动 / 搜索过滤功能。
- 把路由切换改为 History API（需服务端支持）。

## 贡献
欢迎提交 issue 或 pull request。请保持代码风格统一并写明变更目的。

## 许可证
建议使用 MIT（可根据需要替换）。默认不包含第三方素材许可证，请确保替换为合规资源。




