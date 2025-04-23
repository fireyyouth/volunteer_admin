
# 目录结构

```
volunteer_admin/
├── public/           # 公共资源目录
├── src/              # 源代码目录
├── index.html        # 入口 HTML 文件
├── package.json      # 项目依赖及脚本配置
├── tsconfig.json     # TypeScript 配置
├── vite.config.ts    # Vite 构建工具配置
├── uno.config.ts     # UnoCSS 配置
├── eslint.config.js  # ESLint 配置
├── pnpm-lock.yaml    # pnpm 锁定文件
```

## src 目录说明

- **App.vue**：应用主组件
- **main.ts**：应用入口文件
- **assets/**：静态资源目录（如图片、字体等）
- **components/**：通用组件目录
- **pages/**：页面组件目录
- **store.ts**：状态管理相关
- **styles/**：全局样式目录
- **types.ts**：全局类型定义
- **utils.ts**：工具函数
- **components.d.ts** / **env.d.ts** / **typed-router.d.ts**：ts 类型声明文件

# 部署

## 前置条件
- 系统安装 nodejs 和 pnpm，最好是最新版
- 安装依赖, 在项目根目录执行 `pnpm install`

## 运行
```
pnpm run dev
```
或者
```
pnpm run build
pnpm run preview
```
