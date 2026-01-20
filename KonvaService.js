import Konva from 'https://cdn.skypack.dev/konva';
import { ShapeHandler } from './ShapeHandler.js';
import { CreationSurface } from './CreationSurface.js';

const defaultDimensions = {
    width: 400,
    height: 400,
}

export class KonvaService {
    constructor() {

        // Control variables
        this.gravity = { acceleration: 19 }; // gravity must be passed as a reference to alter animations mid-run
        this.spawnRate = 1;

        this.createEvent('initial_values', {
            surfaceArea: defaultDimensions.width * defaultDimensions.height,
            spawnRate: this.spawnRate,
            gravity: this.gravity.acceleration,
        });

        this.stage = new Konva.Stage({
            container: 'konva-container',
            ...defaultDimensions,
        });

        this.stage.add(new Konva.Layer(), new Konva.Layer());
        const [ creationLayer, shapesLayer ] = this.stage.getLayers();

        // Draws shapes and handle their lifetime
        const shapeHandler = new ShapeHandler(Konva, this.stage, shapesLayer);

        // Catches click and orders a spawn
        new CreationSurface(
            Konva,
            this.stage,
            creationLayer,
            (position) => shapeHandler.spawnUserOrderedShape(this.gravity, position),
        );

        // Auto-logic
        setInterval(() => {
            // Estimate uncovered space
            const { width, height } = defaultDimensions;

            // chunkSize deermines precision tolerance. Higher numbers means faster scanning and decresed accuracy.
            const chunkSize = 25;
            const columns = Math.floor(width / chunkSize);
            const rows = Math.floor(height / chunkSize);

            let emptyArea = width * height;

            for (let column = 0; column < columns; column += 1) {
                for (let row = 0; row < rows; row += 1) {
                    const centerDrift = chunkSize / 2;
                    const samplePoint = { x: column * chunkSize + centerDrift, y: row * chunkSize + centerDrift }
                    const intersection = shapesLayer.getIntersection(samplePoint);

                    if (intersection)
                        emptyArea -= chunkSize ** 2;
                }
            }

            this.createEvent('surfaceArea', { value: emptyArea });

            // Spawn shapes evenly across the timespan of a second
            const timeSegment = 1000 / this.spawnRate;
            let delay = 0;

            for (let i = 0; i < this.spawnRate; i++) {
                setTimeout(() => {
                    shapeHandler.releaseShape(this.gravity);
                }, delay);

                delay += timeSegment;
            }

        }, 1000);
    }

    increaseRate() {
        if (this.spawnRate < 10)
            this.spawnRate += 1;

        return this.spawnRate;
    }

    decreaseRate() {
        if (this.spawnRate > 0)
            this.spawnRate -= 1;

        return this.spawnRate;
    }

    increaseGravity() {
        if (this.gravity.acceleration < 99)
            this.gravity.acceleration += 1;

        return this.gravity.acceleration;
    }

    decreaseGravity() {
        if (this.gravity.acceleration > 0)
            this.gravity.acceleration -= 1;

        return this.gravity.acceleration;
    }

    createEvent(type, detailObject) {
        window.dispatchEvent(new CustomEvent(type, { detail: detailObject }));
    }
}