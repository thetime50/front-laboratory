import ElementUI from 'element-ui';
import {
  Submenu
} from "element-ui";

// function elementSetPropDefault(comp, prop, val) {
//     let props = ElementUI[comp].props
//     if (typeof (props[prop]) == 'function') {
//         props[prop] = {
//             type: props[prop],
//             default: val,
//         }
//     } else {
//         props[prop].default = val
//     }
// }
// elementSetPropDefault('TableColumn', 'align', 'center')
// elementSetPropDefault('TableColumn', 'headerAlign', 'center')


Submenu.methods.handleMouseenter = function (event, showTimeout = this.showTimeout) {

  if (!('ActiveXObject' in window) && event.type === 'focus' && !event.relatedTarget) {
    return;
  }
  const {
    rootMenu,
    disabled
  } = this;
  if (
    (rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal') ||
    (!rootMenu.collapse && rootMenu.mode === 'vertical') ||
    disabled
  ) {
    return;
  }
  this.dispatch('ElSubmenu', 'mouse-enter-child');
  clearTimeout(this.timeout);
  this.timeout = setTimeout(() => {
    this.rootMenu.openMenu(this.index, this.indexPath);
  }, showTimeout);

  if (this.appendToBody) {
    let pel = this.$parent.$el
    if (pel == this.$el) {
      pel = this.$parent.$parent.$el
    }
    pel.dispatchEvent(new MouseEvent('mouseenter'));
  }
}
