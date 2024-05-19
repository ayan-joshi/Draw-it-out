// Array to store the drawing history
let drawHistory = [];

export function startDrawing(canvas, color, lineThickness, bgColor, isErasing) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.6;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = `${color}`;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = lineThickness;

  let isDrawing = false;

  // Main draw function
  const draw = (e) => {
    if ((!isDrawing && !isErasing) || (isErasing && e.buttons !== 1)) {
      return;
    }
    ctx.globalCompositeOperation = isErasing ? "destination-out" : "source-over";
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
    if (!isErasing) {
      drawHistory.push({ x: e.offsetX, y: e.offsetY });
    }
  };

  let lastX = 0;
  let lastY = 0;
  canvas.addEventListener("mousedown", (e) => {
    lastX = e.offsetX;
    lastY = e.offsetY;
    isDrawing = true;
    drawHistory.push({ x: lastX, y: lastY });
  });
  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
  });
  canvas.addEventListener("mouseout", () => {
    isDrawing = false;
  });
  canvas.addEventListener("mousemove", draw);

  //Event listeners for touch devices
  canvas.addEventListener("touchstart", (e) => {
    const touch = e.touches[0]; // Get the first touch
    lastX = touch.clientX - canvas.offsetLeft;
    lastY = touch.clientY - canvas.offsetTop;
    isDrawing = true;
    drawHistory.push({ x: lastX, y: lastY });
  });

  canvas.addEventListener("touchend", () => {
    isDrawing = false;
  });

  canvas.addEventListener("touchcancel", () => {
    isDrawing = false;
  });

  canvas.addEventListener("touchmove", (e) => {
    if (!isDrawing) return;
    const touch = e.touches[0]; // Get the first touch
    const offsetX = touch.clientX - canvas.offsetLeft;
    const offsetY = touch.clientY - canvas.offsetTop;
    draw({ offsetX, offsetY });
  });
}

// Function to clear the canvas
export function clearCanvas(canvas, bgColor) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to handle taking a snapshot
export const takeSnapshot = (canvas) => {
  const snapshot = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = snapshot;
  link.download = "snapshot.png";
  link.click();
};

export function changeBG(canvas, color) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawHistory = [];
}
