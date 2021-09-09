import { GetLocalBounds } from '../../components/transform/GetLocalBounds';

export class SpatialHashGrid
{
    //  The width / height of a grid cell in pixels
    cellWidth: number;
    cellHeight: number;

    //  The cells Map
    cells: Map<string, Set<number>>;

    //  id insertion order array
    indexes: number[];

    debug: Array<{ key: string, x: number, y: number, width: number, height: number }>;

    constructor (minX: number, minY: number, maxX: number, maxY: number, cellWidth: number, cellHeight: number)
    {
        this.cellWidth = Math.abs(cellWidth);
        this.cellHeight = Math.abs(cellHeight);

        this.cells = new Map();

        this.indexes = [];

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

        this.cells.clear();

        this.indexes = [];
    }

    getX (x: number): number
    {
        return Math.floor(x / this.cellWidth);
    }

    getY (y: number): number
    {
        return Math.floor(y / this.cellHeight);
    }

    getXCeil (x: number): number
    {
        return Math.ceil(x / this.cellWidth);
    }

    getYCeil (y: number): number
    {
        return Math.ceil(y / this.cellHeight);
    }

    getKey (x: number, y: number): string
    {
        return `${this.getX(x)} ${this.getY(y)}`;
    }

    getGridKey (x: number, y: number): string
    {
        return `${x} ${y}`;
    }

    addToCell (id: number, gridX: number, gridY: number): string
    {
        const cells = this.cells;

        const key = this.getGridKey(gridX, gridY);

        if (cells.has(key))
        {
            cells.get(key).add(id);
        }
        else
        {
            cells.set(key, new Set([ id ]));
        }

        return key;
    }

    inView (x: number, y: number, width: number, height: number): Set<number>
    {
        return this.intersects(x, y, x + width, y + height);
    }

    intersects (left: number, top: number, right: number, bottom: number): Set<number>
    {
        const topLeftX = this.getX(left);
        const topLeftY = this.getY(top);

        const bottomRightX = this.getX(right);
        const bottomRightY = this.getY(bottom);

        const cells = this.cells;

        let results: number[] = [];

        //  Quick abort if we only need the contents of 1 cell
        if (topLeftX === bottomRightX && topLeftY === bottomRightY)
        {
            const key = this.getGridKey(topLeftX, topLeftY);

            // console.log('Single cell', key);

            if (cells.has(key))
            {
                results = [ ...cells.get(key) ];
            }
        }
        else
        {
            const width = (bottomRightX - topLeftX) + 1;
            const height = (bottomRightY - topLeftY) + 1;

            let gridX = topLeftX;
            let gridY = topLeftY;
            let placed = 0;

            for (let i = 0; i < width * height; i++)
            {
                const key = this.getGridKey(gridX, gridY);

                if (cells.has(key))
                {
                    // console.log('getting cell', key, cells.has(key), ...cells.get(key));

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
        }

        //  Sort by insertion index

        const indexes = this.indexes;

        results.sort((a: number, b: number): number =>
        {
            return indexes.indexOf(a) - indexes.indexOf(b);
        });

        return new Set(results);
    }

    add (id: number): void
    {
        const { left, top, right, bottom } = GetLocalBounds(id);

        const topLeftX = this.getX(left);
        const topLeftY = this.getY(top);

        const bottomRightX = this.getXCeil(right);
        const bottomRightY = this.getYCeil(bottom);

        const width = (bottomRightX - topLeftX);
        const height = (bottomRightY - topLeftY);

        this.indexes.push(id);

        // console.log('INSERT', id, '>', topLeftX, topLeftY, 'to', bottomRightX, bottomRightY, 'width/height', width, height);

        //  Quick abort if entity fits into 1 cell
        if (width === 1 && height === 1)
        {
            // console.log('FAST INSERTING', id, 'INTO', topLeftX, topLeftY);

            this.addToCell(id, topLeftX, topLeftY);

            return;
        }

        let gridX = topLeftX;
        let gridY = topLeftY;
        let placed = 0;

        for (let i = 0; i < width * height; i++)
        {
            // console.log('INSERTING', id, 'INTO', gridX, gridY);

            this.addToCell(id, gridX, gridY);

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

    has (id: number): boolean
    {
        let result = false;

        this.cells.forEach(cell =>
        {
            if (cell.has(id))
            {
                result = true;

                return;
            }
        });

        return result;
    }

    remove (id: number): void
    {
        this.cells.forEach(cell => cell.delete(id));

        const idx = this.indexes.indexOf(id);

        if (idx > -1)
        {
            this.indexes.splice(idx, 1);
        }
    }
}
