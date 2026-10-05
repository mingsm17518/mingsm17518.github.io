// Obsidian 图片宽度语法兼容：![alt|265](src) → 设置 width 并清理 alt
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('img').forEach(function (img) {
    var m = /^(.*)\|(\d+)$/.exec(img.alt || '');
    if (m) {
      img.setAttribute('width', m[2]);
      img.setAttribute('alt', m[1]);
    }
  });
});
