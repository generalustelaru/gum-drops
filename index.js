import { KonvaService } from "./KonvaService.js"

const konva = new KonvaService();

document.querySelector('#increase-spawn-rate').addEventListener('click', () => {
    konva.increaseRate();
});
document.querySelector('#decrease-spawn-rate').addEventListener('click', () => {
    konva.decreaseRate();
});
