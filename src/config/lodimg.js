export default function(el, binding) {
  var color = Math.floor(Math.random() * 1000000); // 设置随机颜色
  el.style.backgroundColor = '#' + color;

  var img = new Image();
  img.src = binding.value; // -->binding.value指的是指令后的参数
  img.onload = function() {
    el.style.backgroundColor = '';
    el.src = binding.value;
  };
}
