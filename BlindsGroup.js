export class BlindsGroup {

    constructor(Konva, stage, layerId) {
        const width = stage.width();
        const height = stage.height();

        this.node = new Konva.Group({
            width,
            height,
        });

        const blindHeight = 100;

        const blindConfig = {
            width,
            height: blindHeight,
            fill: 'red',
            opacity: 0.3,
        }

        const topBlind = new Konva.Rect({
            ...blindConfig,
        });

        const bottomBlind = new Konva.Rect({
            ...blindConfig,
            y: stage.height() - blindHeight,
        });

        this.node.add(topBlind, bottomBlind);

        stage.getLayers()[layerId].add(this.node);
    };
}