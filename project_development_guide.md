# 前端开发强制流程

开发人员必须严格按照以下步骤进行，不得跳过或更改顺序。

## 1. 项目需求获取与管理

在开始使用 GitHub CLI 之前，请先阅读以下文档：
[Git CLI 指南](/Users/clayzhang/Code/nimship-admin-nuxt/docs/gitcli_instruction.md)

1.1 使用 GitHub CLI 获取最新的 Issues、Projects 和 Wiki
1.2 查看本地 Issues 和 Projects
1.3 在本地文件中标记要处理的 Issue 和 Project
1.4 如果没有待处理的 Issues 和 Projects，可以先完善项目文档和项目Wiki，建议创建一个Project来跟进
1.4 查看需要处理的 Issue 和 Project是否有wiki
1.4 查看或创建功能设计文档（在本地 Wiki 仓库中）
1.5 更新分支信息和开发进度到Project中（对于已开始开发的Project）

## 2. 需求分析与现状评估

4.1 创建新分支
4.2 在本地环境运行项目
4.3 查看相关现有代码
4.4 参考已有页面布局和组件使用方式
4.5 记录问题和实现方案

## 3. 开发准备

5.1 检查 types/database.ts 文件
5.2 查看 utils/outline.ts 文件，如果没有请生成，记录项目所有的types、utils、components 和 composable 列表
5.3 参考 /Users/clayzhang/Code/nimship-admin-nuxt/composables 中的示例
5.4 确认所需 shadcn/vue 组件可用性
5.5 浏览 components/ui 文件夹和其他项目组件
5.6 确认无头浏览器已安装好，在进行功能开发时实时查看console和页面显示效果

## 4. 开发阶段

6.1 制定详细实现计划
6.2 遵循设计文档、开发规范和 claude.config.ts 配置
6.3 优先考虑移动端体验和响应式设计
6.4 使用英语编写代码和注释
6.5 添加或更新 JSDoc 注释
6.6 定期本地提交代码
6.7 更新/生成 utils/outline.ts 文件（如有变动）

## 7. 测试与修复

在开始测试之前，请仔细阅读以下文档：
[测试指南](/Users/clayzhang/Code/nimship-admin-nuxt/docs/test_instruction.md)

7.1 运行自动化测试套件
7.2 记录发现的问题
7.3 系统地修复所有问题
7.4 反复测试直到全部通过

## 8. 文档更新

8.1 更新所有相关文档
8.2 确保文档与最新代码一致
8.3 更新本地 Wiki 仓库相关页面
8.4 确保 utils/outline.ts 文件已更新（如有变动）

## 9. 同步与提交

9.1 推送本地更改到远程
9.2 创建或更新 Pull Request
9.3 同步本地 Issues 和项目信息
9.4 推送本地 Wiki 更改到远程

## 10. 代码审查

10.1 定期检查 PR 评论
10.2 根据审查意见进行修改
10.3 重复步骤 7-9 直到 MR 被批准
10.4 更新 PR 状态

## 11. 最终确认与合并

11.1 再次运行所有测试
11.2 确认所有文档已更新
11.3 获得项目负责人的最终批准
11.4 合并 PR

## 严格遵守事项

- 基于 types/database.ts 进行类型定义
- 利用 utils/outline.ts 中的现有资源
- 参考已有页面布局和组件使用方式
- 定期同步本地和远程信息
- 遵守 claude.config.ts 中的配置和要求
- 保持代码风格一致性
- 确保移动端兼容性
- 禁止跳过步骤或更改流程顺序
- 及时更新 utils/outline.ts 文件
