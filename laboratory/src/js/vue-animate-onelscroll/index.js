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
                el._onelscroll_scrollCb = scrollCb
                el._onelscroll_scrollEl = scrollEl
                scrollEl.addEventListener('scroll', scrollCb, false)
            },
        })
    }
}