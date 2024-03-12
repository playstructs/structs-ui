export class SUIUtil {
  /**
   * @param {HTMLElement} dynamicElm
   * @param {HTMLElement} originElm
   */
  positionAbove(dynamicElm, originElm) {
    const originRect = originElm.getBoundingClientRect();

    // If dynamic element would end up offscreen, place it below
    if (
      originRect.top < dynamicElm.offsetHeight
      && (window.innerHeight - originRect.bottom) >= dynamicElm.offsetHeight
    ) {
      this.positionBelow(dynamicElm, originElm);
    } else {
      dynamicElm.style.top = `${originElm.offsetTop - dynamicElm.offsetHeight}px`;
    }
  }

  /**
   * @param {HTMLElement} dynamicElm
   * @param {HTMLElement} originElm
   */
  positionBelow(dynamicElm, originElm) {
    const originRect = originElm.getBoundingClientRect();

    // If dynamic element would end up offscreen, place it above
    if (
      (window.innerHeight - originRect.bottom) < dynamicElm.offsetHeight
      && originRect.top > dynamicElm.offsetHeight
    ) {
      this.positionAbove(dynamicElm, originElm);
    } else {
      dynamicElm.style.top = `${originElm.offsetTop + originElm.offsetHeight}px`;
    }
  }

  /**
   * @param {HTMLElement} dynamicElm
   * @param {HTMLElement} originElm
   */
  horizontallyCenter(dynamicElm, originElm) {
    dynamicElm.style.left = `${originElm.offsetLeft - (dynamicElm.offsetWidth - originElm.offsetWidth) / 2}px`;
  }
}
