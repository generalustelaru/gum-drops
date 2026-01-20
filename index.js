import { KonvaService } from "./KonvaService.js"

window.addEventListener('initial_values', (event) => {
    const { surfaceArea, spawnRate, gravity } = event.detail;
    document.querySelector('#surface-area').value = surfaceArea || 0;
    document.querySelector('#spawn-rate').value = spawnRate || 0;
    document.querySelector('#gravity').value = gravity || 0;
});

window.addEventListener('population', (event) => {
    document.querySelector('#shape-count').value = event.detail.value || 0;
});

window.addEventListener('surfaceArea', (event) => {
    document.querySelector('#surface-area').value = event.detail.value || 0;
});

const konva = new KonvaService();

document.querySelector('#increase-spawn-rate').addEventListener('click', () => {
    document.querySelector('#spawn-rate').value = konva.increaseRate();
});
document.querySelector('#decrease-spawn-rate').addEventListener('click', () => {
    document.querySelector('#spawn-rate').value = konva.decreaseRate();
});

document.querySelector('#increase-gravity').addEventListener('click', () => {
        document.querySelector('#gravity').value = konva.increaseGravity();
});
document.querySelector('#decrease-gravity').addEventListener('click', () => {
        document.querySelector('#gravity').value = konva.decreaseGravity();
});