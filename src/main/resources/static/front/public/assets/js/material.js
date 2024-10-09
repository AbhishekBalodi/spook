document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Initialize MDC autoInit
  mdc.autoInit();

  // Attach Ripple to buttons
  const buttons = document.querySelectorAll('.mdc-button');
  buttons.forEach(button => {
    mdc.ripple.MDCRipple.attachTo(button);
  });

  // Attach MDCTextField to textfields
  const textFields = document.querySelectorAll('.mdc-text-field');
  textFields.forEach(textField => {
    mdc.textField.MDCTextField.attachTo(textField);
  });

  // Initialize MDCMenu for all menu elements
  const menuEls = Array.from(document.querySelectorAll('.mdc-menu'));
  menuEls.forEach(menuEl => {
    const menu = new mdc.menu.MDCMenu(menuEl);
    const buttonEl = menuEl.parentElement.querySelector('.mdc-menu-button');

    buttonEl.addEventListener('click', () => {
      menu.open = !menu.open;
    });

    menu.setAnchorCorner(mdc.menu.Corner.BOTTOM_LEFT);
    menu.setAnchorElement(buttonEl);
  });

  // Initialize MDCTabBar for all tab elements
  const tabBars = document.querySelectorAll('.mdc-tab-bar');
  tabBars.forEach(tabBar => {
    const currentTabBar = new mdc.tabBar.MDCTabBar(tabBar);
    
    currentTabBar.listen('MDCTabBar:activated', event => {
      const contentEls = tabBar.parentElement.querySelectorAll('.content');

      contentEls.forEach(contentEl => {
        contentEl.classList.remove('content--active');
      });

      contentEls[event.detail.index].classList.add('content--active');
    });
  });
});
