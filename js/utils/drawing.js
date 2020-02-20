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

function drawRoundedBox(ctx, x, y, width, height, radius, color = 'black') {
  ctx.save();
  const innerHeight = height - 2 * radius;
  const innerWidth = width - 2 * radius;
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
  ctx.fillRect(x, y + radius, width, innerHeight);
  ctx.fillRect(x + radius, y, innerWidth, height);
  ctx.restore();
}

function drawRoundedBoard({
  ctx,
  boxShadow,
  width,
  height,
  radius,
  color,
  backgroundColor = 'black'
}) {
  drawRoundedBox(
    ctx,
    boxShadow,
    boxShadow,
    width,
    height,
    radius,
    backgroundColor
  );
  drawRoundedBox(ctx, 0, 0, width, height, radius, color);
}
