import { App, PropType } from 'vue'

// 自定义事件类型
export type CustomEventFuncType<T> = PropType<(arg: T) => void>

// 自定义组件
export type SFCWithInstall<T> = T & { install(app: App): void}