export default function(el, binding) {
  el.onclick = function() {
    // -->binding.value指的是指令后的参数
    if (binding.value) {
      if (binding.value.indexOf('http') < 0) {
        return;
      }
      var parent = document.body;
      // 添加 div
      var div = document.createElement('div');
      // 设置 div 属性，如 id
      div.setAttribute('style', 'position: fixed;top: 0;left: 0;z-index:9999;background: rgba(19,23,27,.3);text-align: center;width:100%;min-height:600;height:100%;overflow: auto;');
      div.innerHTML = '<img src="' + binding.value + '" style="margin:0 auto;margin-top:70px;min-height:60%;max-height:100%;" />';
      div.ondblclick = function() {
        div.parentNode.removeChild(div);
      };
      // console.dir(Vue);
      window.vm.$notify({
        type: 'info',
        message: '双击退出图片放大！'
      });
      parent.appendChild(div);
    }
  };
}
