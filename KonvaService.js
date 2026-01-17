import Konva from 'https://cdn.skypack.dev/konva';

const stageConstants = { width: 800, height: 1200 }

export class KonvaService {
    constructor() {

        const { width, height, scale } = this.calculateDimensions();

        this.stage = new Konva.Stage({
            container: 'konva-container',
            width,
            height,
        });

        this.stage.scale({ x: scale, y: scale });

        this.stage.add(new Konva.Layer());

        this.containerGroup = new Konva.Group({...stageConstants});
        this.stage.getLayers()[0].add(this.containerGroup);

        const background = new Konva.Rect({...stageConstants, fill:'red'})

        this.containerGroup.add(background);

    }

    calculateDimensions() {
        const {
            width: conainerWidth,
            height: containerHeight,
        } = (() => {
            const container = document.getElementById('konva-container')?.getBoundingClientRect();

            if (!container)
                throw new Error('Cannot find canvas container!');

            return container;
        })();

        if (containerHeight == 0 || conainerWidth == 0) {
            console.error({ elementHeight: containerHeight, elementWidth: conainerWidth });
            throw new Error('Container size is incompatible!');
        }

        const { width: sceneWidth, height: sceneHeight } = stageConstants;
        const widthScale = conainerWidth / sceneWidth;
        const heightScale = containerHeight / sceneHeight;
        const scale = Math.min(widthScale, heightScale);

        return {
            width: sceneWidth * scale,
            height: sceneHeight * scale,
            scale,
        };
    }
}