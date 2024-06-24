import { Bounds } from "types/custom-types.ts";

/**
 * A bare bones class that represents a 2D plane - aka, table.
 * The table bounds has a hardcoded origin of minX,minY at 0,0.
 */
export class Table {
    private readonly _bounds: Bounds = { minX: 0, maxX: 0, minY: 0, maxY: 0 }

    public get bounds() {
        return this._bounds
    }

    /**
     * The incoming table sizes cannot be smaller than the origin values
     * of 0,0.
     * 
     * @param sizeX 
     * @param sizeY 
     */
    public constructor(sizeX: number, sizeY: number) {
        if (sizeX <= 0) throw new RangeError('sizeX must be a non-zero positive number')
        if (sizeY <= 0) throw new RangeError('sizeY must be a non-zero positive number')

        this._bounds = { minX: 0, maxX: sizeX, minY: 0, maxY: sizeY }
    }
}