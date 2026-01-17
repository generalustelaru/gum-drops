import Konva from 'https://cdn.skypack.dev/konva';
import { BlindsGroup } from './BlindsGroup.js';
import { ShapeHandler } from './ShapeHandler.js';
import { ClickSpawnSurface } from './ClickSpawnSurface.js';

const defaultDimensions = {
    width: 400,
    height: 600
}

const layerIds = {
    spawnPad: 0,
    shapes: 1,
    blinds: 2,
}

export class KonvaService {
    constructor() {

        this.stage = new Konva.Stage({
            container: 'konva-container',
            ...defaultDimensions,
        });

        this.stage.add(...[
            new Konva.Layer(),
            new Konva.Layer(),
            new Konva.Layer(),
        ]);

        // Cover top and bottom
        new BlindsGroup(Konva, this.stage, layerIds.blinds);

        // Draw shapes and handle their lifetime
        const shapeHandler = new ShapeHandler(Konva, this.stage, layerIds.shapes);

        // Relay spawn command
        new ClickSpawnSurface(
            Konva,
            this.stage,
            layerIds.spawnPad,
            (position) => shapeHandler.spawnShape(position),
        );

        // Control variables
        this.gravity = 1.6;
        this.spawnRate = 1;

        // Auto-spawn logic
        this.interval = setInterval(() => {
            const delay = 1000 / this.spawnRate;
            let spawnTime = 0;

            for (let i = 0; i < this.spawnRate; i++) {
                setTimeout(() => {
                    shapeHandler.spawnShape();
                }, spawnTime);
                spawnTime += delay;
            }

        }, 1000);
    }

    increaseRate() {
        this.spawnRate += 1;
    }

    decreaseRate() {
        if (this.spawnRate == 0)
            return;

        this.spawnRate -= 1;
    }
}