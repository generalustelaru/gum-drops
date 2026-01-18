import { KonvaService } from "./KonvaService.js"

const konva = new KonvaService();

document.querySelector('#increase-spawn-rate').addEventListener('click', () => {
    konva.increaseRate();
});
document.querySelector('#decrease-spawn-rate').addEventListener('click', () => {
    konva.decreaseRate();
});

document.querySelector('#increase-gravity').addEventListener('click', () => {
    konva.increaseGravity();
});
document.querySelector('#decrease-gravity').addEventListener('click', () => {
    konva.decreaseGravity();
});

window.addEventListener('population', (event) => {
    document.querySelector('#shape-count').value = event.detail.value || 0;
});

window.addEventListener('surfaceArea', (event) => {
    document.querySelector('#surface-area').value = event.detail.value || 0;
});

window.addEventListener('spawnRate', (event) => {
    document.querySelector('#spawn-rate').value = event.detail.value || 0;
});

window.addEventListener('gravity', (event) => {
    document.querySelector('#gravity').value = event.detail.value || 0;
});