import { IWorld, createWorld } from 'bitecs';

import { BoundsComponent } from '../../components/bounds';

export class SpatialHashGrid
{
    cellWidth: number;
    cellHeight: number;

    width: number;
    height: number;

    cells: Map<string, Set<number>>;

    // cells: Array<Set<number>>;
    // debug: Array<{ x: number, y: number, width: number, height: number }>;

    constructor (minX: number, minY: number, maxX: number, maxY: number, cellWidth: number, cellHeight: number)
    {
        cellWidth = Math.abs(cellWidth);
        cellHeight = Math.abs(cellHeight);

        const width = Math.floor((maxX - minX) / cellWidth);
        const height = Math.floor((maxY - minY) / cellHeight);

        this.width = width;
        this.height = height;

        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;

        this.cells = new Map();

        for (let y = minY; y < maxX; y += cellHeight)
        {
            for (let x = minX; x < maxX; x += cellWidth)
            {
                this.cells.set(this.getKey(x, y), new Set());

                // this.cells.push(new Set());
                // this.debug.push({ x: x * cellSize, y: y * cellSize, width: cellSize, height: cellSize });
            }
        }

        /*
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

        */

        console.log('grid', this);
    }

    clear (): void
    {
        this.cells.forEach(cell => cell.clear());
    }

    getKey (x: number, y: number): string
    {
        const gx = Math.floor(x / this.cellWidth);
        const gy = (Math.floor(y / this.cellHeight) * this.width);

        return `${gx} ${gy}`;
    }

    /*
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
    */

    /*
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
    */
}
