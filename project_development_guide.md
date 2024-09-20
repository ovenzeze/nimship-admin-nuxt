# 前端开发强制流程

开发人员必须严格按照以下步骤进行，不得跳过或更改顺序。

## 0. 项目资源熟悉

0.1 仔细阅读 types/database.ts 文件，熟悉完整的项目数据库类型定义
0.2 查看 utils/outline.ts 文件，了解项目中可用的 types、utils、components 和 composable 列表
0.3 浏览 components/ui 文件夹，熟悉所有可用的 shadcn/vue 组件
0.4 快速浏览其他项目组件，了解项目特定组件的使用方式

## 1. 项目初始化（需要网络连接）

1.1 克隆项目仓库及其 Wiki：
    gh repo clone [仓库名]
    gh repo clone [仓库名].wiki
1.2 拉取最新的 Issues 和项目信息到本地：
    gh issue list --limit 1000 --json number,title,body,labels,assignees > local_issues.json
    gh project list --format json > local_projects.json

## 2. 需求管理（可离线进行，需定期同步）

2.1 查看本地 Issues：
    cat local_issues.json | jq '.'
2.2 在本地文件中标记要处理的 Issue
2.3 查看或创建功能设计文档（在本地 Wiki 仓库中）

## 3. 需求分析与现状评估（主要离线进行）

3.1 在本地创建新分支
3.2 在本地环境运行项目
3.3 仔细查看与需求相关的现有代码
3.4 参考已有页面布局和组件使用方式
3.5 在本地文档中记录问题和实现方案

## 4. 开发准备

4.1 检查 types/database.ts 文件，确认是否需要扩展或直接使用现有类型
4.2 查阅 utils/outline.ts 文件，确定可复用的资源
4.3 参考 /Users/clayzhang/Code/nimship-admin-nuxt/composables 中的示例
4.4 确认所需的 shadcn/vue 组件在 components/ui 中是否可用

## 5. 开发阶段（离线进行）

5.1 基于需求分析和现状评估，制定详细的实现计划
5.2 严格遵循设计文档、开发规范和 claude.config.ts 中的配置进行编码
5.3 优先考虑移动端体验和响应式设计
5.4 使用英语编写代码和注释
5.5 为所有组件添加或更新 JSDoc 注释
5.6 定期在本地提交代码
5.7 如果创建了新的或更新了现有的 types、utils、components 或 composable，更新 utils/outline.ts 文件

## 6. 测试与修复（主要离线进行）

6.1 运行项目的自动化测试套件
6.2 在本地文档中记录发现的问题
6.3 系统地修复发现的所有问题
6.4 反复测试直到所有测试用例全部通过

## 7. 文档更新（离线进行）

7.1 完成需求后，更新所有相关文档
7.2 确保文档与最新代码保持一致
7.3 在本地 Wiki 仓库中更新相关页面
7.4 确保 utils/outline.ts 文件已更新（如有变动）

## 8. 同步与提交（需要网络连接）

8.1 将本地更改推送到远程：
    git push origin [分支名]
8.2 创建或更新 Pull Request：
    gh pr create --fill
    或
    gh pr edit --add-label "ready-for-review"
8.3 同步本地 Issues 和项目信息：
    gh issue list --limit 1000 --json number,title,body,labels,assignees > local_issues.json
    gh project list --format json > local_projects.json
8.4 将本地 Wiki 更改推送到远程：
    cd [仓库名].wiki && git push

## 9. 代码审查（需要网络连接）

9.1 定期检查 PR 评论：
    gh pr view --comments
9.2 根据审查意见进行必要的修改（离线进行）
9.3 重复步骤 6-8 直到 MR 被批准
9.4 更新 PR 状态：
    gh pr edit --add-label "approved"

## 10. 最终确认与合并（需要网络连接）

10.1 再次运行所有测试，确保无误
10.2 确认所有文档都已更新
10.3 获得项目负责人的最终批准
10.4 合并 PR：
    gh pr merge

严格遵守事项：

- 始终基于 types/database.ts 进行类型定义的扩展或直接使用
- 充分利用 utils/outline.ts 中列出的现有资源
- 在进行页面设计之前，参考已有页面布局和组件使用方式
- 定期同步本地和远程的 Issues、Projects 和 Wiki 信息
- 遵守 claude.config.ts 中的所有配置和要求
- 保持代码风格一致性
- 确保移动端兼容性
- 禁止跳过任何步骤或更改流程顺序
- 及时更新 utils/outline.ts 文件，确保其反映最新的项目结构
