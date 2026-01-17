import { ShapeFactory } from "./ShapeFactory.js";

export class ShapeHandler {
    constructor(Konva, stage, layerId) {
        this.konva = Konva;
        this.stage = stage;
        this.groupWidth = stage.width();
        this.groupHeight = stage.height();
        this.group = new Konva.Group({
            width: this.groupWidth,
            height: this.groupHeight,
        });

        stage.getLayers()[layerId].add(this.group);
        this.incrementalShapeId = 0;
        this.shapes = new Map();
        this.factory = new ShapeFactory(Konva, stage, stage.getLayers()[layerId])
    }

    spawnShape(gravity, coordinates) {
        const shapeId = this.incrementalShapeId++;
        const shapeData = this.factory.produceShapeObject(
            shapeId,
            coordinates || { x: Math.floor(Math.random() * this.groupWidth), y: 0 },
            gravity,
        );

        this.shapes.set(shapeId, shapeData);
        // this might prove innefficient if the spawn rate is very fast
        // TODO: pre-spawn shapes, add them in batches, and only activate them here (visibility, animation)
        this.group.add(shapeData.node);
        shapeData.animation.start();
    }
}