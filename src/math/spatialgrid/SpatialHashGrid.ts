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
            cells[ topLeft ].add(id);

            return;
        }

        const topRight = this.getIndex(bounds[2], bounds[1]);
        const bottomLeft = this.getIndex(bounds[0], bounds[3]);

        const width = (topRight - topLeft) + 1;
        const height = Math.max(1, Math.ceil((bottomLeft - topLeft) / this.height));

        // console.log('width', width, 'height', height);
        // console.log('topleft', topLeft, 'topright', topRight, 'bottomleft', bottomLeft, 'bottomright', bottomRight);

        const startX = Math.floor(bounds[0] / this.cellSize);
        const startY = Math.floor(bounds[1] / this.cellSize);

        let gridX = startX;
        let gridY = startY;
        let placed = 0;

        for (let i = 0; i < width * height; i++)
        {
            const index = gridX + (gridY * this.width);

            console.log('adding to index', index);

            cells[ index ].add(id);

            gridX++;
            placed++;

            if (placed === width)
            {
                gridX = startX;
                gridY++;
                placed = 0;
            }
        }
    }

    getIndex (x: number, y: number): number
    {
        return Math.floor(x / this.cellSize) + (Math.floor(y / this.cellSize) * this.width);
    }

    getBounds (x: number, y: number, right: number, bottom: number): number[]
    {
        const topLeft = this.getIndex(x, y);
        const topRight = this.getIndex(right, y);
        const bottomLeft = this.getIndex(x, bottom);
        const bottomRight = this.getIndex(right, bottom);

        return [ topLeft, topRight, bottomLeft, bottomRight ];
    }
}
