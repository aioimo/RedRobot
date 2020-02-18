function drawHalfCircleLeft({ ctx, x, y, radius = 20, color }) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, Math.PI / 2, (3 * Math.PI) / 2);
  ctx.fill();
  ctx.restore();
}

function drawHalfCircleRight({ ctx, x, y, radius = 20, color }) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, Math.PI / 2, (3 * Math.PI) / 2, true);
  ctx.fill();
  ctx.restore();
}

function drawQuarterCircle(ctx, x, y, radius, startAngle, color = 'black') {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, Math.PI / 2 + startAngle, Math.PI + startAngle, false);
  ctx.lineTo(x, y);
  ctx.fill();
  ctx.restore();
}

function drawRoundedBox(
  ctx,
  x,
  y,
  totalWidth,
  totalHeight,
  radius,
  color = 'black'
) {
  ctx.save();
  let innerHeight = totalHeight - 2 * radius;
  let innerWidth = totalWidth - 2 * radius;
  ctx.fillStyle = color;
  drawQuarterCircle(ctx, x + radius, y + radius, radius, Math.PI / 2, color);
  drawQuarterCircle(
    ctx,
    x + radius + innerWidth,
    y + radius,
    radius,
    Math.PI,
    color
  );
  drawQuarterCircle(
    ctx,
    x + radius,
    y + radius + innerHeight,
    radius,
    0,
    color
  );
  drawQuarterCircle(
    ctx,
    x + radius + innerWidth,
    y + radius + innerHeight,
    radius,
    (3 * Math.PI) / 2,
    color
  );
  ctx.fillRect(x, y + radius, totalWidth, innerHeight);
  ctx.fillRect(x + radius, y, innerWidth, totalHeight);
  ctx.restore();
}
