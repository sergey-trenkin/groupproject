const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');
const saveBtn = document.getElementById('saveBtn');

let isDrawing = false;
const pixelSize = 10; // Размер пикселя

// Заполняем canvas белым цветом
ctx.fillStyle = '#ffffff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Функция для рисования пикселя
function drawPixel(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

// Получение координат пикселя
function getPixelCoords(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / pixelSize);
    const y = Math.floor((event.clientY - rect.top) / pixelSize);
    return { x, y };
}

// События мыши
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    const { x, y } = getPixelCoords(event);
    drawPixel(x, y, colorPicker.value);
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        const { x, y } = getPixelCoords(event);
        drawPixel(x, y, colorPicker.value);
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Очистка canvas
clearBtn.addEventListener('click', () => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Сохранение изображения
saveBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'simple-paint.png';
    link.href = canvas.toDataURL();
    link.click();
});