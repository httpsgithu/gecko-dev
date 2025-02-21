function replaceChildElement(newChild, oldChild) {
  oldChild.parentElement.replaceChild(newChild, oldChild);
}

function createFakeSelectmenu(selectedValueText) {
  const selectmenu = document.createElement('button');
  selectmenu.classList.add('fake-selectmenu-internal-selectmenu-button');
  selectmenu.innerHTML = `
    <div class="fake-selectmenu-selected-value"></div>
    <div class="fake-selectmenu-internal-selectmenu-button-icon"></div>
    <style>
    .fake-selectmenu-internal-selectmenu-button {
      display: inline-flex;
      align-items: center;
      cursor: default;
      appearance: none;
      background-color: Field;
      color: ButtonText;
      border: 1px solid ButtonBorder;
      border-radius: 0.25em;
      padding: 0.25em;
      overflow-x:hidden;
      overflow-y:hidden;
    }

    .fake-selectmenu-selected-value {
      color: HighlightText;
      flex-grow:1;
    }

    .fake-selectmenu-internal-selectmenu-button-icon {
      background-image: url(support/selectmenu_button_icon.svg);
      background-origin: content-box;
      background-repeat: no-repeat;
      background-size: contain;
      height: 1.0em;
      margin-inline-start: 4px;
      opacity: 1;
      outline: none;
      padding-bottom: 2px;
      padding-inline-start: 3px;
      padding-inline-end: 3px;
      padding-top: 2px;
      width: 1.2em;
    }
    </style>
  `;

  if (selectedValueText) {
    selectmenu.querySelector('.fake-selectmenu-selected-value').textContent = selectedValueText;
  }

  return selectmenu;
}
