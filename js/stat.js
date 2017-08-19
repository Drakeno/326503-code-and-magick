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

    var max = -1;
    var maxIndex = -1;

    for (var i = 0; i < times.length; i++) {
        var time = times[i];
        if (time > max) {
            max = time;
            maxIndex = i;
        }
    }

    var histogramHeight = 150;
    var step = histogramHeight / (max - 0);
    var barWidth = 40; // px; 
    var indent = 90;    // px;
    var initialX = 150; // px;
    var initialY = 120;  // px;
    var opacit = Math.random();

    for (var i = 0; i < times.length; i++) {
        if (names[i] === 'Вы') {
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = 'rgb(255, 0, 0)';
        } else {
            ctx.globalAlpha = Math.random();
            ctx.fillStyle = 'rgb(0, 0, 255)';
        }
        ctx.fillRect(initialX + indent * i, 130 + initialY - times[i] * step, barWidth, times[i] * step);
        ctx.fillStyle = '#000';
        ctx.globalAlpha = 1.0;
        ctx.fillText(names[i], initialX + indent * i, initialY + histogramHeight);
        ctx.fillText(Math.round(times[i]), initialX + indent * i, 120 + initialY - times[i] * step);
    }
};