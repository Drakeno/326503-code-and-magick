'use strict';
window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.strokeRect(110, 20, 420, 270);
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = 'white';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура, вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = Math.max.apply(null, times);
  var histogramHeight = 150;
  var step = histogramHeight / (max - 0);
  var barWidth = 40;
  var indent = 90;
  var initialX = 150;
  var initialY = 120;
  var playerColor;

  for (var j = 0; j < times.length; j++) {
    if (names[j] === 'Вы') {
      playerColor = 'rgba(255, 0, 0, 1)';
    } else {
      playerColor = 'rgba(0, 0, 255,' + Math.random() + ')';
    }

    ctx.fillStyle = playerColor;
    ctx.fillRect(initialX + indent * j, 130 + initialY - times[j] * step, barWidth, times[j] * step);
    ctx.fillStyle = '#000';
    ctx.fillText(names[j], initialX + indent * j, initialY + histogramHeight);
    ctx.fillText(Math.round(times[j]), initialX + indent * j, 120 + initialY - times[j] * step);
  }
};
