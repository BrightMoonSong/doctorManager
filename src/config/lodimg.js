export default function(el, binding) {
  // 图片加载出来之前设置个随机背景色
  // var color = Math.floor(Math.random() * 1000000); // 设置随机颜色
  // el.style.backgroundColor = '#' + color;
  el.style.backgroundColor = '#fff';

  var img = new Image();
  img.src = binding.value; // -->binding.value指的是指令后的参数
  img.onload = function() {
    el.style.backgroundColor = '';
    el.src = binding.value;
  };
}
