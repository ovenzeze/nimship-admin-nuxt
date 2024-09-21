
# Nimship Admin 开发指南

## 环境设置

1. 确保已安装 Node.js 和 pnpm。
2. 克隆项目仓库：`git clone https://github.com/your-repo/nimship-admin-nuxt.git`
3. 进入项目目录：`cd nimship-admin-nuxt`
4. 安装依赖：`pnpm install`

## 开发流程

1. 启动开发服务器：`pnpm run dev`
2. 在浏览器中访问：`http://localhost:3000`

## 自动化测试

我们提供了一个自动化脚本来启动开发服务器并测试页面加载。使用方法如下：

1. 确保已安装 Python 和 Selenium。
2. 运行脚本：`python dev_server_test.py`

这个脚本会启动开发服务器，使用无头浏览器访问页面，并提供基本的页面信息。

## 代码规范

- 遵循 Vue.js 和 Nuxt.js 的最佳实践。
- 使用 ESLint 进行代码质量检查。
- 提交代码前运行 `pnpm run lint` 检查代码质量。

## 部署

1. 构建生产版本：`pnpm run build`
2. 启动生产服务器：`pnpm run start`

## 注意事项

- 定期更新依赖：`pnpm update`
- 遵循组件化和模块化的开发方式
- 注重代码的可维护性和可扩展性

## Code Utility Functions

We have introduced a set of utility functions to help with precise code updates and reading. These functions are located in `code_utils.py`:

1. `update_code_section(file_path, start_line, end_line, new_content)`:
   - Updates a specific section of code in a file.
   - Parameters:
     - `file_path`: Path to the file to be updated.
     - `start_line`: Starting line number (inclusive).
     - `end_line`: Ending line number (inclusive).
     - `new_content`: New content to insert.
   - Returns: Status message indicating success or failure.

2. `read_code_section(file_path, start_line, end_line)`:
   - Reads a specific section of code from a file.
   - Parameters:
     - `file_path`: Path to the file to be read.
     - `start_line`: Starting line number (inclusive).
     - `end_line`: Ending line number (inclusive).
   - Returns: Content of the specified line range.

3. `find_function(file_path, function_name)`:
   - Finds the location of a function definition in a file.
   - Parameters:
     - `file_path`: Path to the file to search.
     - `function_name`: Name of the function to find.
   - Returns: Tuple of (start_line, end_line) if found, None otherwise.

These functions allow for precise code manipulation and reading, reducing errors from manual edits and improving efficiency in development tasks.

### Usage Example:

```python
from code_utils import update_code_section, read_code_section, find_function

# Update a specific section of code
update_code_section('my_file.py', 10, 15, 'new code here')

# Read a specific section of code
content = read_code_section('my_file.py', 10, 15)

# Find a function in a file
func_location = find_function('my_file.py', 'my_function')
if func_location:
    start, end = func_location
    print(f"Function 'my_function' found at lines {start}-{end}")
```

Remember to import these functions when you need to perform precise code updates or readings.
