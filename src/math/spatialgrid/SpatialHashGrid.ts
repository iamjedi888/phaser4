import { BoundsComponent } from '../../components/bounds/BoundsComponent';

export class SpatialHashGrid
{
    cellWidth: number;
    cellHeight: number;

    width: number;
    height: number;

    cells: Map<string, Set<number>>;

    debug: Array<{ x: number, y: number, width: number, height: number }>;

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

                this.debug.push({ x: x, y: y, width: cellWidth, height: cellHeight });
            }
        }

        console.log('grid', this);
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
        return (Math.floor(y / this.cellHeight) * this.width);
    }

    getKey (x: number, y: number): string
    {
        return `${this.getX(x)} ${this.getY(y)}`;
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

    intersects (left: number, top: number, right: number, bottom: number): number[]
    {
        const topLeftX = this.getX(left);
        const topLeftY = this.getY(top);

        const bottomRightX = this.getX(right);
        const bottomRightY = this.getY(bottom);

        const cells = this.cells;

        //  Quick abort if we only need the contents of 1 cell
        if (topLeftX === bottomRightX && topLeftY === bottomRightY)
        {
            const key = this.getGridKey(topLeftX, topLeftY);

            // console.log('Single cell', key);

            return [ ...cells.get(key) ];
        }

        const topRightX = bottomRightX;
        const bottomLeftY = bottomRightY;

        const width = (topRightX - topLeftX) + 1;
        const height = Math.max(1, Math.ceil((bottomLeftY - topLeftY) / this.height));

        // console.log('width', width, 'height', height);
        // console.log('topleft', topLeftX, topLeftY, 'topright', topRightX, topRightY, 'bottomleft', bottomLeftX, bottomLeftY, 'bottomright', bottomRightX, bottomRightY);

        let gridX = topLeftX;
        let gridY = topLeftY;
        let placed = 0;

        const results: number[] = [];

        for (let i = 0; i < width * height; i++)
        {
            const key = this.getGridKey(gridX, gridY);

            results.concat(...cells.get(key));

            gridX++;
            placed++;

            if (placed === width)
            {
                gridX = topLeftX;
                gridY++;
                placed = 0;
            }
        }

        return results;
    }

    insert (id: number): void
    {
        //  0 = left, 1 = top, 2 = right, 3 = bottom
        const [ left, top, right, bottom ] = BoundsComponent.global[id];

        const topLeftX = this.getX(left);
        const topLeftY = this.getY(top);

        const bottomRightX = this.getX(right);
        const bottomRightY = this.getY(bottom);

        //  Quick abort if entity fits into 1 cell
        if (topLeftX === bottomRightX && topLeftY === bottomRightY)
        {
            // console.log('ltrb', left, 'x', top, 'to', right, 'x', bottom);
            // console.log('topleft', topLeftX, 'x', topLeftY, 'bottomright', bottomRightX, 'x', bottomRightY);

            this.add(topLeftX, topLeftY, id);

            // console.log('Single cell', key);

            return;
        }

        const topRightX = bottomRightX;
        const bottomLeftY = bottomRightY;

        const width = (topRightX - topLeftX) + 1;
        const height = Math.max(1, Math.ceil((bottomLeftY - topLeftY) / this.height));

        // console.log('width', width, 'height', height);
        // console.log('topleft', topLeftX, topLeftY, 'topright', topRightX, topRightY, 'bottomleft', bottomLeftX, bottomLeftY, 'bottomright', bottomRightX, bottomRightY);

        let gridX = topLeftX;
        let gridY = topLeftY;
        let placed = 0;

        for (let i = 0; i < width * height; i++)
        {
            this.add(gridX, gridY, id);

            // console.log('adding to index', key);

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
