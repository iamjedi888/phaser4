import { GetLocalBounds } from '../../components/transform/GetLocalBounds';

export class SpatialHashGrid
{
    cellWidth: number;
    cellHeight: number;

    width: number;
    height: number;

    cells: Map<string, Set<number>>;

    debug: Array<{ key: string, x: number, y: number, width: number, height: number }>;

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

        this.debug = [];

        for (let y = minY; y < maxX; y += cellHeight)
        {
            for (let x = minX; x < maxX; x += cellWidth)
            {
                this.cells.set(this.getKey(x, y), new Set());

                this.debug.push({ key: this.getKey(x, y), x: x, y: y, width: cellWidth, height: cellHeight });
            }
        }
    }

    clear (): void
    {
        this.cells.forEach(cell => cell.clear());
    }

    getX (x: number): number
    {
        return Math.floor(x / this.cellWidth);
    }

    getY (y: number): number
    {
        return Math.floor(y / this.cellHeight);
    }

    getXC (x: number): number
    {
        return Math.ceil(x / this.cellWidth);
    }

    getYC (y: number): number
    {
        return Math.ceil(y / this.cellHeight);
    }

    getKey (x: number, y: number): string
    {
        return `${this.getX(x)} ${this.getY(y)}`;
    }

    getKeyC (x: number, y: number): string
    {
        return `${this.getXC(x)} ${this.getYC(y)}`;
    }

    getGridKey (x: number, y: number): string
    {
        return `${x} ${y}`;
    }

    add (gridX: number, gridY: number, id: number): string
    {
        const cells = this.cells;

        const key = this.getGridKey(gridX, gridY);

        if (!cells.has(key))
        {
            cells.set(key, new Set([ id ]));
        }
        else
        {
            cells.get(key).add(id);
        }

        return key;
    }

    near (id: number): number[]
    {
        return [];
    }

    intersects (left: number, top: number, right: number, bottom: number): Set<number>
    {
        const topLeftX = this.getX(left);
        const topLeftY = this.getY(top);

        const bottomRightX = this.getXC(right);
        const bottomRightY = this.getYC(bottom);

        // console.log('----------');
        // console.log('INTERSECTS');
        // console.log('----------');
        // console.log(topLeftX, topLeftY, 'to', bottomRightX, bottomRightY);

        const cells = this.cells;

        //  Quick abort if we only need the contents of 1 cell
        if (topLeftX === bottomRightX && topLeftY === bottomRightY)
        {
            const key = this.getGridKey(topLeftX, topLeftY);

            // console.log('Single cell', key);

            return new Set([ ...cells.get(key) ]);
        }

        const width = (bottomRightX - topLeftX) + 1;
        const height = (bottomRightY - topLeftY) + 1;

        // console.log('width', width, 'height', height);

        let gridX = topLeftX;
        let gridY = topLeftY;
        let placed = 0;

        let results: number[] = [];

        for (let i = 0; i < width * height; i++)
        {
            const key = this.getGridKey(gridX, gridY);

            // console.log('getting cell', key, cells.has(key), ...cells.get(key));

            if (cells.has(key))
            {
                // console.log(...cells.get(key));

                results = results.concat(...cells.get(key));
            }

            gridX++;
            placed++;

            if (placed === width)
            {
                gridX = topLeftX;
                gridY++;
                placed = 0;
            }
        }

        return new Set(results);
    }

    insert (id: number): void
    {
        const { left, top, right, bottom } = GetLocalBounds(id);

        const topLeftX = this.getX(left);
        const topLeftY = this.getY(top);

        const bottomRightX = this.getXC(right);
        const bottomRightY = this.getYC(bottom);

        const width = (bottomRightX - topLeftX);
        const height = (bottomRightY - topLeftY);

        // console.log('INSERT', id, '>', topLeftX, topLeftY, 'to', bottomRightX, bottomRightY, 'width/height', width, height);

        //  Quick abort if entity fits into 1 cell
        if (width === 1 && height === 1)
        {
            // console.log('FAST INSERTING', id, 'INTO', topLeftX, topLeftY);

            this.add(topLeftX, topLeftY, id);

            return;
        }

        let gridX = topLeftX;
        let gridY = topLeftY;
        let placed = 0;

        for (let i = 0; i < width * height; i++)
        {
            // console.log('INSERTING', id, 'INTO', gridX, gridY);

            this.add(gridX, gridY, id);

            gridX++;
            placed++;

            if (placed === width)
            {
                gridX = topLeftX;
                gridY++;
                placed = 0;
            }
        }
    }
}
