export default function(el) {
  let oDiv = el;
  oDiv.onmousedown = function(e) {
    let l = e.clientX - oDiv.offsetLeft;
    let t = e.clientY - oDiv.offsetTop;
    oDiv.style.position = 'absolute';
    document.onmousemove = function(e) {
      oDiv.style.left = e.clientX - l + 'px';
      oDiv.style.top = e.clientY - t + 'px';
    };
    oDiv.onmouseup = function() {
      document.onmousemove = null;
      oDiv.onmouseup = null;
    };
  };
}
