import { GetLocalBounds } from '../../components/transform/GetLocalBounds';

export class SpatialHashGrid
{
    //  The width / height of a grid cell in pixels
    cellWidth: number;
    cellHeight: number;

    //  The cells Map
    cells: Map<string, Set<number>>;

    //  id insertion order array
    ids: number[];
    index: number;

    constructor (cellWidth: number, cellHeight: number)
    {
        this.cellWidth = Math.abs(cellWidth);
        this.cellHeight = Math.abs(cellHeight);

        this.cells = new Map();

        this.ids = [];
        this.index = 0;
    }

    clear (): void
    {
        this.cells.forEach(cell => cell.clear());

        this.cells.clear();

        this.ids = [];
        this.index = 0;
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

        //  Quick exit if we only need the contents of 1 cell
        if (topLeftX === bottomRightX && topLeftY === bottomRightY)
        {
            const key = this.getGridKey(topLeftX, topLeftY);

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

        const ids = this.ids;

        results.sort((a: number, b: number): number =>
        {
            return ids[a] - ids[b];
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

        this.ids[id] = this.index++;

        //  Quick exit if entity fits into 1 cell
        if (width === 1 && height === 1)
        {
            this.addToCell(id, topLeftX, topLeftY);

            return;
        }

        let gridX = topLeftX;
        let gridY = topLeftY;
        let placed = 0;

        for (let i = 0; i < width * height; i++)
        {
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

    update (id: number): void
    {
        this.remove(id);

        this.add(id);
    }

    has (id: number): boolean
    {
        return !!this.ids[id];
    }

    remove (id: number): void
    {
        if (this.has(id))
        {
            this.cells.forEach(cell => cell.delete(id));

            this.ids[id] = 0;
        }
    }
}
