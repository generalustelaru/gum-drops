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
        this.shapes = new Map();
        this.factory = new ShapeFactory(
            Konva,
            stage,
            layer,
            (shapeId) => this.destroyShape(shapeId),
        );

        setInterval(() => {
            window.dispatchEvent(new CustomEvent('population', { detail: { value: this.shapes.size } }));
        }, 500);
    }

    spawnShape(gravity, coordinates) {
        const shapeId = this.incrementalShapeId++;
        const shapeData = this.factory.produceShapeData(
            shapeId,
            coordinates || { x: Math.floor(Math.random() * this.groupWidth), y: -50 },
            gravity,
        );

        this.shapes.set(shapeId, shapeData);
        // this might prove inefficient if the spawn rate is very fast
        // TODO: pre-spawn shapes, add them in batches, and only activate them here (visibility, animation)
        this.group.add(shapeData.node);
        shapeData.animation.start();
    }

    destroyShape(shapeId) {
        const data = this.shapes.get(shapeId);

        if (data) {
            data.animation.stop();
            data.node.destroy();
            this.shapes.delete(shapeId);
        }
    }
}