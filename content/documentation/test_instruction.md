# 前端开发测试指南

## 1. 测试用例设计

### 1.1 单元测试

- 测试各个组件、函数和工具方法
- 覆盖正常输入、边界条件和异常情况

### 1.2 集成测试

- 验证组件间交互和数据流
- 测试 API 调用和响应处理

### 1.3 端到端测试

- 模拟完整用户流程
- 验证页面导航和数据持久化

### 1.4 性能和兼容性测试

- 检查页面加载时间和渲染性能
- 在不同浏览器和设备上测试响应式设计

## 2. 测试执行

### 2.1 使用 runtest.py

- 位置：`test/runtest.py`
- 用法：
  - 全部测试：`python runtest.py`
  - 特定测试：`python runtest.py test_name1 test_name2`
- 特性：
  - 创建 Python 子进程执行测试
  - 2 分钟超时限制
  - LLM 可实时监测输出和运行状态

### 2.2 实时测试

- 开发过程中使用无头浏览器
- 持续观察页面内容和控制台输出
- 实时判断页面可访问性和功能正常性

示例（使用 Playwright）：

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("http://localhost:3000")
    
    # 监控控制台和检查内容
    page.on("console", lambda msg: print(f"Console: {msg.text}"))
    assert page.is_visible("h1"), "Header is not visible"
    
    # 交互测试
    page.click("#login-button")
    assert page.url == "http://localhost:3000/dashboard", "Login failed"
    
    browser.close()
```

3. 测试最佳实践

编写独立、可维护的测试
集成到 CI/CD 流程
监控并改进代码覆盖率
采用测试驱动开发（TDD）方法

4. 注意事项

定期运行完整测试套件
为复杂交互编写专门测试
在代码审查中包含测试审查
为每个 bug 添加相应测试用例
