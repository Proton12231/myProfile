# 个人主页网站项目

这是一个现代风格的个人主页网站，包含个人资料展示、动态分享以及后台管理系统。

## 项目架构

项目分为三个主要部分：

```
├── client/            # 前端展示页面 (React + TypeScript)
├── admin/             # 后台管理系统 (Vue3 + Element UI + JavaScript)
├── server/            # 后端服务 (Node.js + Express + MongoDB)
├── index.html         # 个人资料页面设计稿
├── moments.html       # 动态页面设计稿
├── style.css          # 个人资料页样式文件
├── moments.css        # 动态页样式文件
├── script.js          # JavaScript脚本
└── README.md          # 项目说明文档
```

## 技术栈

### 客户端 (client)

- React 19
- TypeScript
- React Router v7
- Styled Components
- i18next (国际化)
- Axios (HTTP 请求)
- Font Awesome (图标)

### 管理后台 (admin)

- Vue 3
- JavaScript
- Element UI
- Vue Router

### 服务端 (server)

- Node.js
- Express
- MongoDB
- RESTful API

## 功能特点

### 个人资料页

- 展示个人基本信息
- 教育经历（时间线形式）
- 工作经历（时间线形式，区分全职/实习）
- 技术栈展示（带进度条）
- 项目经历
- 网站运行统计（运行天数、访客数）
- 教育经历详情（GPA、排名、主修课程、所获奖项）

### 动态页

- 支持多种图片布局（九宫格、四宫格、三宫格、单图等）
- 超过 9 张图片时，显示+N 提示
- 显示发布地点和时间
- 支持点赞、评论、分享功能

### 管理后台

- 内容管理（个人信息、教育经历、工作经历、项目经历）
- 动态管理（发布、编辑、删除）
- 数据统计与分析
- 用户管理与权限控制

## 设计特点

- 响应式设计，适配移动端和桌面端
- 现代 Bento Box 风格布局
- 毛玻璃效果和圆角设计
- 平滑过渡动画
- 暗黑模式支持
- 移动端优化（顶部固定导航栏和底部悬浮导航栏）

## 开发与部署

### 客户端开发

```bash
cd client
npm install
npm run dev
```

### 管理后台开发

```bash
cd admin
npm install
npm run dev
```

### 服务端开发

```bash
cd server
npm install
npm run dev
```

## 浏览器兼容性

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 注意事项

- 确保 MongoDB 服务已启动
- 开发环境需配置相应的环境变量
- 部署前请进行完整的测试
