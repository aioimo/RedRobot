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
