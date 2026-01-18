const types = [
    { type: 'circular', kind: 'circle' },
    { type: 'circular', kind: 'elipsoid' },
    { type: 'polygonal', kind: 'triangle' },
    { type: 'polygonal', kind: 'square' },
    { type: 'polygonal', kind: 'pentagon' },
    { type: 'polygonal', kind: 'hexagon' },
    { type: 'star', kind: 'three-point' },
    { type: 'star', kind: 'four-point' },
    { type: 'star', kind: 'pentagram' },
    { type: 'star', kind: 'hexagram' },
];

const colors = [
  '#FF0000', // Red
  '#FF4500', // Orange Red
  '#FF8C00', // Dark Orange
  '#FFD700', // Gold
  '#FFFF00', // Yellow
  '#ADFF2F', // Yellow Green
  '#7FFF00', // Chartreuse
  '#00FF00', // Lime Green
  '#00FF7F', // Spring Green
  '#00FFFF', // Cyan
  '#00BFFF', // Deep Sky Blue
  '#0080FF', // Blue
  '#0000FF', // Pure Blue
  '#4B0082', // Indigo
  '#8B00FF', // Violet
  '#9400D3', // Dark Violet
  '#FF00FF', // Magenta
  '#FF1493', // Deep Pink
  '#FF69B4', // Hot Pink
  '#FF6347'  // Tomato (back to red)
];

export class ShapeFactory {
    constructor(Konva, stage, layer, destructionCallback) {
        this.Konva = Konva;
        this.stage = stage;
        this.layer = layer;
        this.destroy = destructionCallback;
    }

    produceShapeData(shapeId, coordinates, gravity) {
        const { type, kind } = types[Math.floor(Math.random() * types.length)];

        const shape = (() => {
            switch (type) {
                case 'circular':
                    return this.getEllipse(Konva, kind, this.stage.width(), coordinates);
                case 'polygonal':
                    return this.getRegularPolygon(Konva, kind, this.stage.width(), coordinates);
                case 'star':
                    return this.getStar(Konva, kind, this.stage.width(), coordinates);
                default:
                    throw new Error(`Cannot determine type: [${type}]`);
            }
        })();

        shape.on('click tap', () => { this.destroy(shapeId) });

        let velocity = 0;

        const fallAnimation = new Konva.Animation(frame => {
            const frameSync = frame.timeDiff / 1000;

            velocity += gravity.acceleration * frameSync;
            shape.y(shape.y() + velocity * frameSync);

            if (shape.y() > this.stage.height() + 25)
                this.destroy(shapeId);

        }, this.layer);

        return {
            node: shape,
            animation: fallAnimation,
        }
    }

    getEllipse(Konva, kind, width, coordinates) {

        return new Konva.Ellipse({
            fill: this.getColor(),
            x: this.getValidX(coordinates.x, width),
            y: coordinates.y,
            radiusX: 25,
            radiusY: kind == 'circle' ? 25 : 13,
        });
    }

    getRegularPolygon(Konva, kind, width, coordinates) {

        return new Konva.RegularPolygon({
            fill: this.getColor(),
            x: this.getValidX(coordinates.x, width),
            y: coordinates.y,
            sides: (() => { switch (kind) {
                case 'triangle': return 3;
                case 'square': return 4;
                case 'pentagon': return 5;
                case 'hexagon': return 6;
                default: return 8;
            } })(),
            radius: 25,
        });
    }

    getStar(Konva, kind, width, coordinates) {

        return new Konva.Star({
            fill: this.getColor(),
            x: this.getValidX(coordinates.x, width),
            y: coordinates.y,
            numPoints: (() => { switch (kind) {
                case 'three-point': return 3;
                case 'four-point': return 4;
                case 'pentagram': return 5;
                case 'hexagram': return 6;
                default: return 8;
            } })(),
            innerRadius: kind == 'three-point' ? 6 : 13,
            outerRadius: 25,
        });
    }

    getColor() {
        return colors[Math.round(Math.random() * colors.length - 1)];
    }

    getValidX(x, width) {
        return Math.max(Math.min(x, width - 25), 25)
    }
}
