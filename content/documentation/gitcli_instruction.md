# GitHub CLI 使用指南

## 安装

在 macOS 上，可以使用 Homebrew 安装 GitHub CLI：

```
brew install gh
```

## 认证

首次使用时，需要进行认证：

```
gh auth login
```

按照提示完成认证过程。

## 常用命令

1. 列出仓库：

   ```
   gh repo list
   ```

2. 获取 Issues：

   ```
   gh issue list --repo [用户名]/[仓库名] --limit [数量] --json number,title,body,labels,assignees
   ```

3. 获取项目信息：

   ```
   gh project list --owner [用户名] --format json
   ```

4. 创建 Pull Request：

   ```
   gh pr create --fill
   ```

5. 查看 Pull Request 评论：

   ```
   gh pr view --comments
   ```

6. 合并 Pull Request：

   ```
   gh pr merge
   ```

## 注意事项

1. 如果遇到权限问题，可能需要刷新认证令牌：

   ```
   gh auth refresh -s [所需权限]
   ```

   例如：`gh auth refresh -s read:project`

2. 在非交互式环境中运行某些命令时，可能需要提供额外的参数，如 `--hostname`。

3. 始终确保你有足够的权限来执行相应的操作。

4. 定期更新 GitHub CLI 以获取最新功能和修复：

   ```
   brew upgrade gh
   ```

5. 使用 `gh help [命令]` 可以获取特定命令的详细帮助信息。
