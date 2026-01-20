export class CreationSurface {

    constructor(stage, layer, positionCallback) {
        const dimensions = {
            width: stage.width(),
            height: stage.height(),
        }

        const group = new Konva.Group(dimensions);
        const surface = new Konva.Rect(dimensions);

        group.add(surface);
        layer.add(group);

        surface.on('click tap', () => {
            positionCallback(stage.getPointerPosition());
        });
    }
}
