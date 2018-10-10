let scale = 1;

function setScale(points) {
  const maxX = points.reduce((max, p) => max.x < p.x ? p : max).x;
  const maxY = points.reduce((max, p) => max.y < p.y ? p : max).y;
  
  scale = Math.min(500 / maxX, 500 / maxY);
}

function getCanvasContext() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  return context;
}

function scalePoints(points) {
  return points.map(p => ({ x: p.x * scale, y: p.y * scale }));
}

function clearCanvas() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawPolygon(points) {
  points = scalePoints(points);
  const context = getCanvasContext();

  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
      
  points.forEach(point => context.lineTo(point.x, point.y));
  context.lineTo(points[0].x, points[0].y);

  context.closePath();
  context.stroke();
}

function drawPoints(points) {
  points = scalePoints(points);
  const context = getCanvasContext();
  context.fillStyle = "#000000";
  context.beginPath();

  points.forEach(p => {
    context.moveTo(p.x, p.y);
    context.arc(p.x, p.y, 4, 0, Math.PI * 2);
  });
  
  context.closePath();
  context.fill();
}