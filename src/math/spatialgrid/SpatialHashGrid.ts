import { BoundsComponent } from '../../components/bounds';

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

    add (gridX: number, gridY: number, id: number): string
    {
        const cells = this.cells;

        const key = this.getKey(gridX, gridY);

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
            console.log('ltrb', left, top, right, bottom);
            console.log('topleft', topLeftX, topLeftY, 'bottomright', bottomRightX, bottomRightY);

            const key = this.add(topLeftX, topLeftY, id);

            console.log('Single cell', key);

            return;
        }

        const topRightX = bottomRightX;
        const topRightY = topLeftY;

        const bottomLeftX = topLeftX;
        const bottomLeftY = bottomRightY;

        const width = (topRightX - topLeftX) + 1;
        const height = Math.max(1, Math.ceil((bottomLeftY - topLeftY) / this.height));

        console.log('width', width, 'height', height);
        console.log('topleft', topLeftX, topLeftY, 'topright', topRightX, topRightY, 'bottomleft', bottomLeftX, bottomLeftY, 'bottomright', bottomRightX, bottomRightY);

        const startX = Math.floor(left / this.cellWidth);
        const startY = Math.floor(top / this.cellHeight);

        let gridX = startX;
        let gridY = startY;
        let placed = 0;

        for (let i = 0; i < width * height; i++)
        {
            const key = this.add(gridX, gridY, id);

            console.log('adding to index', key);

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

    /*
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
