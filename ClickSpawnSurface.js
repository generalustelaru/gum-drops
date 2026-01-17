export class ClickSpawnSurface {

    constructor(Konva, stage, layerId, positionCallback) {
        const width = stage.width();
        const height = stage.height()
        const group = new Konva.Group({ width, height });
        const surface = new Konva.Rect({ width, height });

        group.add(surface);
        stage.getLayers()[layerId].add(group);

        surface.on('click', () => {
            positionCallback(stage.getPointerPosition());
        });
    }
}