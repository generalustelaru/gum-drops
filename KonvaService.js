import Konva from 'https://cdn.skypack.dev/konva';
import { BlindsGroup } from './BlindsGroup.js';

const defaultDimensions = {
    width: 400,
    height: 600
}

const layers = {
    shapes: 0,
    blinds: 1,
}
export class KonvaService {
    constructor() {

        // const { width, height, scale } = this.calculateDimensions();

        this.stage = new Konva.Stage({
            container: 'konva-container',
            ...defaultDimensions,
        });

        // this.stage.scale({ x: scale, y: scale });

        this.stage.add(...[
            new Konva.Layer(),
            new Konva.Layer(),
        ]);

        this.shapeGroup = new Konva.Group({...defaultDimensions});
        this.stage.getLayers()[layers.shapes].add(this.shapeGroup);

        new BlindsGroup(Konva, this.stage, layers.blinds);
    }

    calculateDimensions() {
        const {
            width: containerWidth,
            height: containerHeight,
        } = (() => {
            const container = document.getElementById('konva-container')?.getBoundingClientRect();

            if (!container)
                throw new Error('Cannot find canvas container!');

            return container;
        })();

        if (containerHeight == 0 || containerWidth == 0) {
            console.error({ elementHeight: containerHeight, elementWidth: containerWidth });
            throw new Error('Container size is incompatible!');
        }

        const { width: sceneWidth, height: sceneHeight } = defaultDimensions;
        const widthScale = containerWidth / sceneWidth;
        const heightScale = containerHeight / sceneHeight;
        const scale = Math.min(widthScale, heightScale);

        console.log({
            conainerWidth: containerWidth, containerHeight, scale
        })
        return {
            width: sceneWidth,
            height: sceneHeight,
            scale,
        };
    }
}