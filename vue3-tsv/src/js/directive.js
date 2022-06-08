import resize from 'vue-resize-directive'

// https://staging-cn.vuejs.org/guide/reusability/custom-directives.html#introduce
// https://cn.vuejs.org/v2/guide/custom-directive.html#ad
console.log('resize', resize)
const resizePlugin = {
    install(app, options) {
        // 配置此应用
        app.directive('resize', {
            // 在绑定元素的 attribute 前
            // 或事件监听器应用前调用
            created: resize.inserted,
            // 绑定元素的父组件卸载后调用
            unmounted: resize.unbind
        })
    }
}

export const directivePlugin = {
    install(app, options) {
        // 配置此应用
        app.use(resizePlugin)
    }
}


