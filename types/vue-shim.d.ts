declare module 'vue' {
    import { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component

    export {
        ref,
        onMounted,
        onUnmounted,
        computed,
        watch,
        nextTick
    } from '@vue/runtime-core'

    export type { Ref } from '@vue/runtime-core'
}