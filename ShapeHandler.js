import { ShapeFactory } from "./ShapeFactory.js";

export class ShapeHandler {
    constructor(Konva, stage, layer) {
        this.konva = Konva;
        this.stage = stage;
        this.groupWidth = stage.width();
        this.groupHeight = stage.height();
        this.group = new Konva.Group({
            width: this.groupWidth,
            height: this.groupHeight,
        });

        layer.add(this.group);

        this.incrementalShapeId = 0;

        this.shapeReserve = [];

        this.activeShapes = new Map();
        this.factory = new ShapeFactory(
            Konva,
            stage,
            layer,
            (shapeId) => this.destroyShape(shapeId),
        );
        setInterval(() => {
            window.dispatchEvent(new CustomEvent('population', { detail: { value: this.activeShapes.size } }));
        }, 1000);
    }

    // Konva.Group.add() is an expensive operation,
    // Hence, if possible, adding an array of nodes in one go is prefferable to individual calls.
    spawnShapes(gravity) {
        const batch = [];

        for (let i = 0; i < 50; i++) {
            const shapeId = this.incrementalShapeId++;
            const shapeData = this.factory.produceShapeData(
                shapeId,
                { x: Math.floor(Math.random() * this.groupWidth), y: -50 },
                gravity,
            );
            batch.push({shapeId, shapeData});
        }

        this.group.add(...batch.map(storedShape => storedShape.shapeData.node));

        this.shapeReserve.push(...batch);
    }

    releaseShape(gravity, coordinates) {

        if (this.shapeReserve.length < 10)
            this.spawnShapes(gravity);

        // Only proceed if user created or shape can descend
        if (gravity.acceleration == 0 && !coordinates)
            return;

        const { shapeId, shapeData } = (() => {
            if (coordinates) {
                const shapeId = this.incrementalShapeId++;
                const shapeData = this.factory.produceShapeData(
                    shapeId,
                    coordinates,
                    gravity,
                );
                this.group.add(shapeData.node);

                return { shapeId, shapeData }
            }

            return this.shapeReserve.shift();
        })();

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
