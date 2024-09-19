# Nimship Admin Nuxt 功能设计文档

## 1. 项目概述

Nimship Admin Nuxt 是一个基于 Nuxt 3 的管理后台应用，旨在提供高效、现代化的企业管理解决方案。该项目利用 Vue 3、TypeScript、Tailwind CSS、Shadcn UI 和 Supabase 等技术，构建了一个功能丰富、易于维护的管理系统。

## 2. 页面/模块设计

### 2.1 登录页面 (login.vue)

#### 基本信息

- 路径：/pages/login.vue
- 用途：用户认证入口

#### 设计思路

- 简洁的登录界面
- 使用 Supabase 进行身份验证
- 支持记住登录状态

#### 功能说明

- 用户名/邮箱和密码登录
- 错误提示
- 登录成功后重定向到主页

#### 开发指南

- 使用 Shadcn UI 的 Input 和 Button 组件
- 实现 useAuth composable 进行认证状态管理
- 使用 Supabase 客户端进行登录请求

### 2.2 主页 (index.vue)

#### 基本信息

- 路径：/pages/index.vue
- 用途：管理后台的主页面

#### 设计思路

- 仪表板布局，展示关键数据和快速访问链接
- 响应式设计，适应不同设备

#### 功能说明

- 显示关键业务指标
- 最近活动列表
- 快速导航到其他模块

#### 开发指南

- 使用 Grid 或 Flex 布局
- 实现数据获取的 composables
- 考虑使用骨架屏提高加载体验

### 2.3 客户管理 (customer.vue)

#### 基本信息

- 路径：/pages/customer.vue
- 用途：管理客户信息

#### 设计思路

- 列表和详情视图
- 支持搜索、筛选和分页
- CRUD 操作

#### 功能说明

- 客户列表展示
- 添加新客户
- 编辑客户信息
- 删除客户
- 客户详情查看

#### 开发指南

- 使用 useCustomer composable 管理客户数据
- 实现表格组件，可考虑使用第三方库如 ag-Grid
- 表单验证使用 vee-validate 或类似库

### 2.4 发票管理 (invoice.vue)

#### 基本信息

- 路径：/pages/invoice.vue
- 用途：管理发票信息

#### 设计思路

- 列表视图和详细视图
- 支持发票生成、编辑和发送
- 集成支付状态跟踪

#### 功能说明

- 发票列表和搜索
- 创建新发票
- 编辑发票
- 发送发票给客户
- 跟踪支付状态

#### 开发指南

- 使用 useInvoice composable 管理发票数据
- 实现 PDF 生成功能
- 集成邮件发送功能
- 考虑使用状态机管理发票生命周期

### 2.5 配送管理 (delivery.vue)

#### 基本信息

- 路径：/pages/delivery.vue
- 用途：管理配送信息和状态

#### 设计思路

- 地图集成
- 实时更新
- 状态跟踪

#### 功能说明

- 配送任务列表
- 分配司机
- 跟踪配送状态
- 查看配送路线

#### 开发指南

- 使用 useDelivery composable 管理配送数据
- 集成地图 API（如 Google Maps 或 Mapbox）
- 实现实时更新功能，考虑使用 WebSocket

### 2.6 司机管理 (driver.vue)

#### 基本信息

- 路径：/pages/driver.vue
- 用途：管理司机信息和任务分配

#### 设计思路

- 司机信息管理
- 任务分配和调度
- 性能跟踪

#### 功能说明

- 司机列表和详情
- 添加/编辑司机信息
- 查看司机当前任务
- 分配新任务
- 查看司机绩效报告

#### 开发指南

- 使用 useDriver composable 管理司机数据
- 实现任务分配算法
- 考虑添加实时通知功能

### 2.7 支付管理 (payment.vue)

#### 基本信息

- 路径：/pages/payment.vue
- 用途：管理支付交易和财务报告

#### 设计思路

- 交易列表和详情
- 财务报表生成
- 支付集成

#### 功能说明

- 查看支付交易历史
- 处理退款
- 生成财务报告
- 集成支付网关

#### 开发指南

- 使用 usePaymentFilters composable 管理支付数据和筛选
- 实现报表生成功能，考虑使用图表库如 Chart.js
- 确保支付安全，遵循 PCI DSS 标准

## 3. 通用组件设计

### 3.1 UI 组件 (/components/ui)

- 按钮、输入框、下拉菜单等基础 UI 组件
- 基于 Shadcn UI，进行 Vue 3 适配

### 3.2 业务组件

- InvoiceList：可重用的发票列表组件
- CustomerForm：客户信息表单组件
- DeliveryMap：配送地图组件

## 4. 状态管理

- 使用 Vue 3 的 Composition API
- 关键状态使用 Nuxt 3 的 useState 进行共享
- 考虑复杂状态管理使用 Pinia

## 5. API 和数据处理

- 使用 Supabase 客户端进行数据操作
- 在 composables 中封装 API 请求逻辑
- 使用 TypeScript 定义数据模型和 API 响应类型

## 6. 认证和授权

- 使用 Supabase 的认证功能
- 实现 useAuth composable 管理认证状态
- 路由守卫确保页面访问权限

## 7. 国际化 (i18n)

- 使用 @nuxtjs/i18n 模块
- 支持中英文切换
- 提取所有文本到语言文件

## 8. 性能优化

- 利用 Nuxt 3 的 SSR 能力
- 实现组件懒加载
- 使用 Vite 的构建优化
- 图片懒加载和优化

## 9. 测试策略

- 单元测试：针对 utils 和 composables
- 组件测试：使用 Vue Test Utils
- 集成测试：测试组件间交互
- E2E 测试：使用 Cypress 或 Playwright

## 10. 部署

- 使用 Vercel 进行部署
- 设置环境变量
- 实现 CI/CD 流程

## 11. 安全考虑

- 实现 CSRF 保护
- 使用 HTTPS
- 输入验证和消毒
- 实现适当的错误处理，避免泄露敏感信息

## 12. 可访问性 (A11y)

- 遵循 WCAG 2.1 指南
- 实现键盘导航
- 使用适当的 ARIA 属性
- 确保足够的颜色对比度

## 13. 未来展望

- 集成更多第三方服务（如 CRM、ERP）
- 实现高级分析和报告功能
- 移动应用开发
- AI 辅助决策功能
