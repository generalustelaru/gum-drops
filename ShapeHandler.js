import { Shape } from "./Shape.js";

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
    }

    spawnShape(coordinates) {
        const shape = new Shape(
            this.konva,
            this.stage,
            coordinates || { x: Math.floor(Math.random() * this.groupWidth), y: 0 }
        );

        this.shapes.set(this.incrementalShapeId++, shape);
        // this might prove innefficient if the spawn rate is very fast
        // TODO: pre-spawn shapes, add them in batches, and only activate them here (visibility, animation)
        this.group.add(shape);
    }
}