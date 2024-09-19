# 前端开发强制流程

开发人员必须严格按照以下步骤进行，不得跳过或更改顺序。

## 0. GitHub CLI 设置和项目信息获取

0.1 安装 GitHub CLI（如果尚未安装）:
    brew install gh

0.2 登录 GitHub CLI:
    gh auth login

0.3 获取最新的 Issues 和项目信息:
    gh issue list --repo [用户名]/[仓库名] --limit 1000 --json number,title,body,labels,assignees > local_issues.json
    gh project list --owner [用户名] --format json > local_projects.json

0.4 查看获取的 Issues:
    cat local_issues.json | jq '.'

注意：如果遇到权限问题，可能需要刷新认证令牌：
    gh auth refresh -s read:project

如果在非交互式环境中运行，可能需要提供额外的参数，如 --hostname。

## 1. 项目资源熟悉（初次参与项目时进行，后续可快速回顾）

1.1 仔细阅读 types/database.ts 文件，熟悉完整的项目数据库类型定义
1.2 查看 utils/index.ts 文件，了解项目中可用的 types、utils、components 和 composable 列表
1.3 浏览 components/ui 文件夹，熟悉所有可用的 shadcn/vue 组件
1.4 快速浏览其他项目组件，了解项目特定组件的使用方式

## 2. 需求分析与现状评估

2.1 在本地创建新分支:
    git checkout -b [分支名]
2.2 在本地环境运行项目
2.3 仔细查看与需求相关的现有代码
2.4 参考已有页面布局和组件使用方式
2.5 在本地文档中记录问题和实现方案

... [其余内容保持不变] ...

