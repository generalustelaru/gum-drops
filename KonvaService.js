import Konva from 'https://cdn.skypack.dev/konva';

export class KonvaService {
    stage;

    constructor() {
        console.log('constructing');
        this.stage = new Konva.Stage({
            container: 'konva-container',
            visible: true,
            opacity: 1,
            ...{ width: 100, height: 100},
        });
    }

    greet() {
        console.log('hi from konva')
    }
}