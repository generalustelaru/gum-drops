import Konva from 'https://cdn.skypack.dev/konva';
import { ShapeHandler } from './ShapeHandler.js';
import { CreationSurface } from './CreationSurface.js';

const defaultDimensions = {
    width: 400,
    height: 400,
}

const layerIds = {
    creation: 0,
    shapes: 1,
}

export class KonvaService {
    constructor() {

         // Control variables
        this.gravity = { acceleration: 19 }; // gravity must be passed as a reference to alter animations mid-run
        this.spawnRate = 1;

        this.stage = new Konva.Stage({
            container: 'konva-container',
            ...defaultDimensions,
        });

        this.stage.add(...[
            new Konva.Layer(), // creation
            new Konva.Layer(), // shapes
        ]);

        // Draws shapes and handle their lifetime
        const shapeHandler = new ShapeHandler(Konva, this.stage, layerIds.shapes);

        // Relays spawn command
        new CreationSurface(
            Konva,
            this.stage,
            layerIds.creation,
            (position) => shapeHandler.spawnShape(this.gravity, position),
        );

        // Auto-spawn logic
        this.interval = setInterval(() => {
            const delay = 1000 / this.spawnRate;
            let spawnTime = 0;

            for (let i = 0; i < this.spawnRate; i++) {
                setTimeout(() => {
                    shapeHandler.spawnShape(this.gravity);
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

    increaseGravity() {
        this.gravity.acceleration += 1;
    }

    decreaseGravity() {
        if (this.gravity.acceleration == 0)
            return;

        this.gravity.acceleration -= 1;
    }
}