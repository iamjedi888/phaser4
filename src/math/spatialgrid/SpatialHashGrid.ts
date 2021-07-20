import { BoundsComponent } from '../../components/bounds';

export class SpatialHashGrid
{
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    cellSize: number;
    width: number;
    height: number;

    cells: Array<Set<number>>;

    debug: Array<{ x: number, y: number, width: number, height: number }>;

    constructor (minX: number, minY: number, maxX: number, maxY: number, cellSize: number)
    {
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
        this.cellSize = cellSize;

        const width = Math.floor((maxX - minX) / cellSize);
        const height = Math.floor((maxY - minY) / cellSize);

        this.width = width;
        this.height = height;

        console.log('grid size', this.width, this.height);

        this.cells = [];
        this.debug = [];

        for (let y = 0; y < height; y++)
        {
            for (let x = 0; x < width; x++)
            {
                this.cells.push(new Set());

                this.debug.push({ x: x * cellSize, y: y * cellSize, width: cellSize, height: cellSize });
            }
        }

        console.log('hash', this.cells);
    }

    clear (): void
    {
        this.cells.forEach(cell => cell.clear());
    }

    insert (id: number): void
    {
        const cells = this.cells;

        const bounds = BoundsComponent.global[id];

        //  0 = left, 1 = top, 2 = right, 3 = bottom

        const topLeft = this.getIndex(bounds[0], bounds[1]);
        const bottomRight = this.getIndex(bounds[2], bounds[3]);

        //  Quick abort if entity fits into 1 cell
        if (topLeft === bottomRight)
        {
            console.log('easyout', topLeft);

            cells[ topLeft ].add(id);

            return;
        }

        const topRight = this.getIndex(bounds[2], bounds[1]);
        const bottomLeft = this.getIndex(bounds[0], bounds[3]);

        const width = topRight - topLeft;
        const height = (bottomLeft - topLeft) / this.height;

        console.log('w/h', width, height, 'tl', topLeft, 'tr', topRight, 'bl', bottomLeft, 'br', bottomRight);

        // let x = topLeft;
        let offset = 0;

        for (let i = 0; i < width * height; i++)
        {
            const index = i + offset;

            console.log('adding to index', index, 'offset', offset);

            offset++;

            if (i % width === 0)
            {
                offset += this.height - width;
            }
        }

        // for (let y = topLeft; y < topLeft + height; y++)
        // {
        //     for (let x = topLeft; x < topLeft + width; x++)
        //     {
        //         const index = x + (y * this.height);

        //         console.log('adding to', x, y, 'index', index);

        //         cells[ index ].add(id);
        //     }
        // }
    }

    getIndex (x: number, y: number): number
    {
        return Math.floor(x / this.cellSize) + (Math.floor(y / this.cellSize) * this.width);
    }
}
