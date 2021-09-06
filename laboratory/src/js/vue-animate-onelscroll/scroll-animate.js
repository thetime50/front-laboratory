export default () => {

  const getClientHeight = () => document.documentElement.clientHeight

  const isInScrollView = ({top, bottom}) => top < getClientHeight() && bottom > 0

  const isInElScrollView = ({top, bottom, scrollEl}) => top < scrollEl.clientHeight && bottom > 0
  
  const isDirectionAgnostic = (params) => typeof params === 'string'

  const isBiDirectional = (params) => params.down && params.up

  const hasBeenApplied = (current = '', prev = '') => current.trim() !== prev.trim()

  const shouldResetAnimation = ({params, isUpwards, repeat}) => repeat &&
                                    (isUpwards && params.down || !isUpwards && params.up)

  const applyAnimationClass = (el, current, newClass = '') => el.className = `${current} ${newClass}`.trim()

  return {
    isInView: isInScrollView,
    isInElView:isInElScrollView,
    run(el, {value: params, modifiers}, 
        {isUpwards, previousClassName = '',scrollEl=window}) {
            console.log(scrollEl.scrollTop)
      
      let isInView = false
      if(scrollEl == window){
          isInView = this.isInView(el.getBoundingClientRect())
      }else{
          isInView = this.isInElView({
              top:el.offsetTop - scrollEl.scrollTop, 
              bottom:scrollEl.scrollTop+scrollEl.clientHeight - el.offsetTop-el.clientHeight,
              scrollEl,
            })
      }
      if(!isInView) {
        if (modifiers.repeat && isDirectionAgnostic(params)) {
          return applyAnimationClass(el, previousClassName)
        }
        return
      }

      if (isDirectionAgnostic(params)) { // 字符串参数
        return applyAnimationClass(el, previousClassName, params)
      }

      if (modifiers.repeat ||
          isBiDirectional(params) ||
          !hasBeenApplied(el.className, previousClassName)) {
        const animationClass = isUpwards ? params.up : params.down
        return applyAnimationClass(el, previousClassName, animationClass)
      }

      if(shouldResetAnimation({params, isUpwards, ...modifiers})) { // 如果当前滚动方向有配置参数类目
        return applyAnimationClass(el, previousClassName)
      }

    }
  }
  
}
