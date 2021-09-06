import ScrollAnimate from './scroll-animate'

function getScrollEl(el, binding) {
    let { name, value, oldValue, expression, arg, modifiers } = binding
    let elParam = value.el
    let scrollEl = window
    if (typeof elParam == 'string') {
        scrollEl = document.querySelector(elParam)
    } else if (elParam instanceof Element || elParam instanceof HTMLDocument) {
        scrollEl = elParam
    }
    return scrollEl
}

function removeEvent(el) {
    let scrollEl = el._onelscroll_scrollEl
    let scrollCb = el._onelscroll_scrollCb
    if (scrollEl && scrollCb) {
        scrollEl.removeEventListener('scroll', scrollCb)
    }
    el._onelscroll_scrollEl = null
    el._onelscroll_scrollCb = null
}

/**
 * checkScrollEl
 * 如果滚动元素是html 那么 动画元素可以是任何元素
 * 如果滚动元素不是html 那么 动画元素的
 */
function checkScrollEl(scrollEl,el){
    if(scrollEl != window && el.parentNode.scrollHeight != scrollEl.scrollHeight){ //可能不是直接的子元素 但是至少要满足高度一致
        if(el.parentNode!=scrollEl ){
            if( el.parentNode.clientHeight!=el.parentNode.scrollHeight ){
                console.warn('warning 内部有滚动元素','el.parentNode',el.parentNode,
                    'el.parentNode.clientHeight',el.parentNode.clientHeight,
                    'el.parentNode.scrollHeight',el.parentNode.scrollHeight
                )
                return false
            } 
            if(el.parentNode.clientHeight != scrollEl.scrollHeight){
                console.warn('warning 滚动高度不匹配',
                    'el.parentNode',el.parentNode,'scrollEl',scrollEl,
                    'el.parentNode.clientHeight',el.parentNode.clientHeight,
                    'scrollEl.scrollHeight',scrollEl.scrollHeight,
                )
                return false
            }
        }
    }
    return true
}


function getScrollCb(scrollEl, el, binding) {
    const scrollAnimate = ScrollAnimate(Date.now())
    const previousClassName = el.className
    let lastScrollTop = scrollEl.pageYOffset
    const scrollCb = function () {
        let scrollTop = scrollEl.pageYOffset || document.documentElement.scrollTop
        const isUpwards = scrollTop < lastScrollTop
        scrollAnimate.run(el, binding, {
            isUpwards,
            previousClassName
        })
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    }
    return scrollCb
}

export default {
    ScrollAnimate,
    install(Vue) {
        Vue.directive('onelscroll', {
            inserted(el, binding) {
                let scrollEl = getScrollEl(el, binding)
                if(!checkScrollEl(scrollEl,el)){
                    return
                }
                let scrollCb = getScrollCb(scrollEl, el, binding)
                el._onelscroll_scrollCb = scrollCb
                el._onelscroll_scrollEl = scrollEl
                scrollEl.addEventListener('scroll', scrollCb, false)
            },
            unbind(el, binding, vnode, oldVnode) {
                removeEvent(el)
            },
            update(el, binding, vnode, oldVnode) {
                removeEvent(el)
                let scrollEl = getScrollEl(el, binding)
                let scrollCb = getScrollCb(scrollEl, el, binding)
                if(!checkScrollEl(scrollEl,el)){
                    return
                }
                el._onelscroll_scrollCb = scrollCb
                el._onelscroll_scrollEl = scrollEl
                scrollEl.addEventListener('scroll', scrollCb, false)
            },
        })
    }
}