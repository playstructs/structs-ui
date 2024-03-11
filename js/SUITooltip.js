export class SUITooltip {

  /**
   * Used to track how long the mouse or touch screen is pressed.
   *
   * @type {number|null} a timeout ID
   */
  static pointerPressedTimer = null;

  /**
   * @param {HTMLElement} trigger
   * @return {HTMLDivElement}
   */
  buildTooltipHTML(trigger) {
    const div = document.createElement('div');
    div.id = `${trigger.id}-message`;
    div.classList.add('sui-tooltip');
    div.innerHTML = trigger.dataset.suiTooltip;
    return div;
  }

  /**
   * @param {HTMLElement} tooltipHtmlElement
   */
  clearPointerPressedTimer(tooltipHtmlElement) {
    tooltipHtmlElement.classList.remove('sui-mod-show');
    clearTimeout(SUITooltip.pointerPressedTimer);
  }

  /**
   * @param {HTMLElement} tooltipElm
   * @param {HTMLElement} tooltipTriggerElm
   */
  pointerPressed(tooltipElm, tooltipTriggerElm) {
    clearTimeout(SUITooltip.pointerPressedTimer);

    SUITooltip.pointerPressedTimer = setTimeout(function() {
      tooltipElm.classList.add('sui-mod-show');

      tooltipElm.style.position = 'absolute';
      tooltipElm.style.top = `${tooltipTriggerElm.offsetTop - tooltipElm.offsetHeight}px`;
      tooltipElm.style.left = `${tooltipTriggerElm.offsetLeft - (tooltipElm.offsetWidth - tooltipTriggerElm.offsetWidth) / 2}px`;

      if (tooltipTriggerElm.dataset.suiModPlacement === 'bottom') {
        tooltipElm.style.top = `${tooltipTriggerElm.offsetTop + tooltipTriggerElm.offsetHeight}px`;
      }

    }.bind(this), 100);
  }

  /**
   * Initialize all tooltips on the page.
   */
  init() {
    let tooltips = document.querySelectorAll('[data-sui-tooltip]');

    if (tooltips.length === 0) {
      return;
    }

    tooltips.forEach(tooltipTrigger => {

      const tooltipElm = this.buildTooltipHTML(tooltipTrigger);
      tooltipTrigger.parentElement.appendChild(tooltipElm);

      // To position the tooltip the parent also must have position defined.
      if (!tooltipTrigger.parentElement.style.position) {
        tooltipTrigger.parentElement.style.position = 'relative';
      }

      // Attach relevant pointer event listeners for mobile or desktop
      if(window.matchMedia("(pointer: coarse)").matches) {

        tooltipTrigger.addEventListener("touchstart", function() {
          this.pointerPressed(tooltipElm, tooltipTrigger);
        }.bind(this), { passive: true });

        window.addEventListener("touchend", function() {
          this.clearPointerPressedTimer(tooltipElm)
        }.bind(this), { passive: true });

        // Press and hold on mobile also fires a contextmenu event which we need to block
        // because it can obscure the tooltip and also cause inadvertent actions.
        tooltipTrigger.addEventListener("contextmenu", (event) => {
          event.preventDefault()
        });

      } else {

        tooltipTrigger.addEventListener("mousedown", function() {
          this.pointerPressed(tooltipElm, tooltipTrigger);
        }.bind(this));

        window.addEventListener("mouseup", function () {
          this.clearPointerPressedTimer(tooltipElm)
        }.bind(this));

      }

    });
  }
}
