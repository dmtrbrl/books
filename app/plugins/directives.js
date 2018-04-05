import Vue from 'vue'

Vue.directive('description', {
  bind(el, binding) {
    let tmp = document.createElement("DIV");
    tmp.innerHTML = binding.value;
    let tmpText = tmp.textContent.slice(0, 400);
    tmpText = tmpText.substr(0, Math.min(tmpText.length, tmpText.lastIndexOf(" ")));
    el.textContent = `${tmpText}...`;
  },
  update() {},
  unbind() {}
})