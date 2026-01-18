export class CreationSurface {

    constructor(Konva, stage, layerId, positionCallback) {
        const dimensions = {
            width: stage.width(),
            height: stage.height(),
        }

        const group = new Konva.Group(dimensions);
        const surface = new Konva.Rect(dimensions);

        group.add(surface);
        stage.getLayers()[layerId].add(group);

        surface.on('click tap', () => {
            positionCallback(stage.getPointerPosition());
        });
    }
}
