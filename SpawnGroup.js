export class SpawnGroup {
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
        if (!coordinates) {
            this.shapes.set(this.incrementalShapeId++, null);
            console.log(this.shapes.size);
        } else {
            console.log('custom spawn not implemented');
        }
    }
}