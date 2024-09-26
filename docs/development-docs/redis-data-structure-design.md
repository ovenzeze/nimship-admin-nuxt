
# Redis 数据结构设计指南

本指南详细说明了chatbot项目中Redis数据结构的设计，包括消息存储、对话索引、任务信息、工作流程等。通过遵循这个指南，使用者可以理解如何从Redis中拉取数据进行展示和统计。

## 1. 消息存储

键: `conversation:{conversation_id}:message:{message_id}`

类型: Hash

字段:

- id: 唯一消息 ID

- conversation_id: 对话 ID

- timestamp: Unix 时间戳

- role: user/assistant/system

- content: 完整的消息内容（压缩存储）

- model: 模型名称（如 gpt-3.5-turbo）

- provider: 模型提供者（如 OpenAI, Anthropic, Bedrock）

- tokens.prompt: 提示词的 token 数

- tokens.completion: 完成的 token 数

- tokens.total: 总 token 数

- lengths.context: 当前会话的上下文长度（字符数）

- lengths.input: 输入长度（字符数）

- lengths.output: 输出长度（字符数）

- timings.total: 总耗时（秒）

- timings.api_call: API 调用耗时（秒）

- timings.processing: 处理耗时（秒）

- cost: 成本（美元）

- extracted_content.code: 提取的代码片段（JSON 数组）

- extracted_content.shell_commands: 提取的 shell 命令（JSON 数组）

- extracted_content.network_requests: 提取的网络请求（JSON 数组）

- extracted_content.file_paths: 提取的文件路径（JSON 数组）

- metadata.user_id: 用户 ID

- metadata.client_info: 客户端信息

- metadata.ip_address: IP 地址

示例查询：

```

HGETALL conversation:conv123:message:msg456

```

## 2. 对话索引

键: `conversation:{conversation_id}:messages`

类型: Sorted Set

值: 消息 ID 列表，按时间戳排序

示例查询：

```

ZRANGE conversation:conv123:messages 0 -1 WITHSCORES

```

## 3. 用户对话索引

键: `user:{user_id}:conversations`

类型: Set

值: 该用户的所有对话 ID

示例查询：

```

SMEMBERS user:user789:conversations

```

## 4. 对话统计

键: `conversation:{conversation_id}:stats`

类型: Hash

字段:

- total_messages: 总消息数

- total_tokens: 总 token 数

- total_cost: 总成本

- total_context_length: 总上下文长度

- total_input_length: 总输入长度

- total_output_length: 总输出长度

- average_response_time: 平均响应时间

示例查询：

```

HGETALL conversation:conv123:stats

```

## 5. 全局统计

键: `global:stats`

类型: Hash

字段:

- total_conversations: 总对话数

- total_messages: 总消息数

- total_tokens: 总 token 数

- total_cost: 总成本

- total_code_snippets: 总代码片段数

- total_shell_commands: 总 shell 命令数

- total_network_requests: 总网络请求数

- total_file_paths: 总文件路径数

- total_context_length: 总上下文长度

- total_input_length: 总输入长度

- total_output_length: 总输出长度

- average_response_time: 平均响应时间

示例查询：

```

HGETALL global:stats

```

## 6. 提供者统计

键: `provider:{provider_name}:stats`

类型: Hash

字段:

- total_messages: 总消息数

- total_tokens: 总 token 数

- total_cost: 总成本

- total_context_length: 总上下文长度

- total_input_length: 总输入长度

- total_output_length: 总输出长度

- average_response_time: 平均响应时间

示例查询：

```

HGETALL provider:OpenAI:stats

```

## 7. 任务信息

键: `task:{task_id}`

类型: Hash

字段:

- id: 任务 ID

- description: 任务描述

- complexity: 任务复杂度（low/medium/high）

- created_at: 创建时间（Unix 时间戳）

- status: 任务状态（pending/in_progress/completed/failed）

- cost_limit: 成本限制

- current_cost: 当前成本

示例查询：

```

HGETALL task:task123

```

## 8. 任务成本追踪

键: `task:{task_id}:cost`

类型: String

值: 当前任务总成本

示例查询：

```

GET task:task123:cost

```

## 9. 任务-代理成本追踪

键: `task:{task_id}:agent:{agent_id}:cost`

类型: String

值: 特定代理在任务中的成本

示例查询：

```

GET task:task123:agent:agent1:cost

```

## 10. 工作流程

键: `workflow:{workflow_id}`

类型: Hash

字段:

- id: 工作流程 ID

- name: 工作流程名称

- description: 工作流程描述

- steps: 工作流程步骤（JSON 数组）

- created_at: 创建时间（Unix 时间戳）

示例查询：

```

HGETALL workflow:workflow789

```

## 11. 代理工作摘要

键: `task:{task_id}:agent:{agent_id}:summary`

类型: List

值: 代理完成的工作摘要列表

示例查询：

```

LRANGE task:task123:agent:agent1:summary 0 -1

```

## 数据展示和统计指南

1. 对话历史展示：

   - 使用 ZRANGE 获取对话中的所有消息 ID

   - 对每个消息 ID 使用 HGETALL 获取详细信息

2. 用户对话列表：

   - 使用 SMEMBERS 获取用户的所有对话 ID

   - 对每个对话 ID 使用 HGETALL 获取对话统计信息

3. 全局统计：

   - 直接使用 HGETALL 获取 global:stats 的所有字段

4. 提供者性能比较：

   - 对每个提供者使用 HGETALL 获取统计信息

   - 比较不同提供者的 total_tokens、total_cost 和 average_response_time

5. 任务进度追踪：

   - 使用 HGETALL 获取任务信息

   - 使用 GET 获取当前任务成本

   - 使用 LRANGE 获取每个代理的工作摘要

6. 成本分析：

   - 对特定任务，使用 GET 获取总成本和每个代理的成本

   - 将这些成本与 HGET task:{task_id} cost_limit 进行比较

7. 工作流程分析：

   - 使用 HGETALL 获取工作流程信息

   - 结合任务信息和代理工作摘要，分析工作流程的执行情况

通过以上方法，您可以从Redis中检索所需的数据，进行全面的数据展示和统计分析。
