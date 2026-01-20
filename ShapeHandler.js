import { ShapeFactory } from "./ShapeFactory.js";

export class ShapeHandler {
    constructor(stage, layer) {
        this.groupWidth = stage.width();
        this.incrementalShapeId = 0;
        this.shapeReserve = []; // acts as a buffer
        this.activeShapes = new Map();
        this.group = new Konva.Group({ width: this.groupWidth, height: stage.height() });
        this.factory = new ShapeFactory(stage, layer, (shapeId) => this.destroyShape(shapeId));

        layer.add(this.group);

        setInterval(() => {
            window.dispatchEvent(new CustomEvent('population', { detail: { value: this.activeShapes.size } }));
        }, 1000);
    }

    // Konva.Group.add() is an expensive operation,
    // Hence, if possible, adding an array of nodes in one go is prefferable to individual calls.
    resupplyReserve(gravity) {
        const batch = [];

        for (let i = 0; i < 50; i++) {
            const shapeId = this.incrementalShapeId++;
            const shapeData = this.factory.produceShapeData(
                shapeId,
                { x: Math.floor(Math.random() * this.groupWidth), y: -50 },
                gravity,
            );

            batch.push({ shapeId, shapeData });
        }

        this.group.add(...batch.map(storedShape => storedShape.shapeData.node));
        this.shapeReserve.push(...batch);
    }

    releaseShape(gravity) {

        if (this.shapeReserve.length < 10)
            this.resupplyReserve(gravity);

        // Only release if shape can descend
        if (gravity.acceleration == 0)
            return;

        const { shapeId, shapeData } = this.shapeReserve.shift();
        this.activeShapes.set(shapeId, shapeData);
        shapeData.animation.start();
    }

    spawnUserOrderedShape(gravity, coordinates) {
        const shapeId = this.incrementalShapeId++;
        const shapeData = this.factory.produceShapeData(shapeId, coordinates, gravity);

        this.group.add(shapeData.node);
        this.activeShapes.set(shapeId, shapeData);
        shapeData.animation.start();
    }

    destroyShape(shapeId) {
        const data = this.activeShapes.get(shapeId);

        if (data) {
            data.animation.stop();
            data.node.destroy();
            this.activeShapes.delete(shapeId);
        }
    }
}
