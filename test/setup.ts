
import { config } from '@vue/test-utils'
import { createPinia } from 'pinia'

// 全局组件模拟
config.global.mocks = {
  // 在这里添加任何全局 mocks
}

// 全局插件
config.global.plugins = [createPinia()]

// 全局指令模拟
config.global.stubs = {
  // 在这里添加任何全局 stubs
}
