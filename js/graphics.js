// Common graphics code

function clearScreen() {
    colorRect(0, 0, canvas.width, canvas.height, "black");
}

function drawBitmapCentered(bitmap, x, y) {
    canvasContext.save();
    canvasContext.translate(x, y);
    canvasContext.drawImage(bitmap, -bitmap.width/2, -bitmap.height/2);
    canvasContext.restore();
}

function drawBitmapCenteredWithRotation(bitmap, x, y, ang) {
    canvasContext.save();
    canvasContext.translate(x, y);
    canvasContext.rotate(ang);
    canvasContext.drawImage(bitmap, -bitmap.width/2, -bitmap.height/2);
    canvasContext.restore();
}

function colorRect(left, top, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(left, top, width, height);
}

function colorCircle(x, y, radius, color) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function colorText(text, x, y, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillText(text, x, y);
}
