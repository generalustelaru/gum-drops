import Konva from 'https://cdn.skypack.dev/konva';
import { BlindsGroup } from './BlindsGroup.js';
import { SpawnGroup } from './SpawnGroup.js';

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

        this.stage = new Konva.Stage({
            container: 'konva-container',
            ...defaultDimensions,
        });

        this.stage.add(...[
            new Konva.Layer(),
            new Konva.Layer(),
        ]);

        this.spawnGroup = new Konva.Group({...defaultDimensions});
        this.stage.getLayers()[layers.shapes].add(this.spawnGroup);

        new BlindsGroup(Konva, this.stage, layers.blinds);

        this.spawnGroup = new SpawnGroup(Konva, this.stage, layers.shapes);

        this.gravity = 1.6;
        this.spawnRate = 1;

        this.interval = setInterval(() => {
            const delay = 1000 / this.spawnRate;
            let spawnTime = 0;

            for (let i = 0; i < this.spawnRate; i++) {
                setTimeout(() => {
                    this.spawnGroup.spawnShape();
                }, spawnTime);
                spawnTime += delay;
            }

        }, 1000);
    }

    increaseRate() {
        this.spawnRate += 1;
    }

    decreaseRate() {
        if (this.spawnRate == 0)
            return;

        this.spawnRate -= 1;
    }
}