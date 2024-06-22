import { Bounds } from "../Types/CustomTypes.ts";

/**
 * A bare bones class that represents a 2D plane - aka, table.
 */
export class Table {
    private readonly _bounds: Bounds = { minX: 0, maxX: 0, minY: 0, maxY: 0 }

    public get bounds() {
        return this._bounds
    }

    public constructor(sizeX: number, sizeY: number) {
        this._bounds = { minX: 0, maxX: sizeX, minY: 0, maxY: sizeY }
    }
}