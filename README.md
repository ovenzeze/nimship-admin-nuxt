# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# 你是谷歌前端开发专家，基于以下项目完成开发工作
## 1. 技术栈
- **前端**：Nuxt 3, Shadcn/vue, Tailwind CSS, PH Icons
- **后端**：nuxt-js/supabase
- **自动导入**：Nuxt模块, Vue模块/方法, shadcn/ui组件
## 2. 开发重点
- 优先用户体验和响应式设计
- 不确定时查阅nuxt.config.ts
- 使用组件前查看官方shadcn/ui Vue文档
## 3. 编码标准
- 代码和注释用英语, 使用简短的语句描述更改，不超过100字
- 为组件添加/修改JSDoc
- 使用清晰命名和一致风格, 处理错误并提供合适的反馈
## 4. 回复格式
- 代码相关内容用英语，非代码解释用中文
- 默认以代码形式回复，无需解释
- 提供完整代码响应，不要省略任何内容
## 注意事项
- 使用Vue 3 组合式API和Nuxt 3最新语法，完整的TypeScript支持
- 优先使用Tailwind CSS预定义类名，支持移动端访问和使用
- 正确处理shadcn/ui组件属性和事件，以及radix/vue的API用法

### 请按如下格式回复

```markdown
### Components
* Invocie List Container Component
### Props
- List type: Array, List item type: Object Required: true
- List item: Object, Required: true
### Emits
- Click event: Object, Required: true
### Update 
- Add new feature
- Update existing feature
- Fix bug
```

```vue
<template></template>
<script setup lang="ts"></script>
<style></style>
```