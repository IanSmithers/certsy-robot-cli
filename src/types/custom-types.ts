/**
 * A bounding rect represented by min/max X and Y values
 * on a 2D plane. Origin can be considered as minX,minY.
 */
export type Bounds = {
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
}

/**
 * A two point vector that represnts a position in 2D space.
 */
export type Vector2D = {
    x: number,
    y: number
}

/**
 * An object transform that contains positional data.
 */
export type Transform = {
    position: Vector2D,
    direction: CardinalDirection
}

/**
 * Hardcoded cardindal direction values.
 * 
 * NOTE: It may be tempting to try and refactor
 * this to use an enum, however the author advises
 * against this as it creates overly complex code.
 */
export const CardinalDirections = ['NORTH', 'EAST', 'SOUTH', 'WEST'] as const
type typedCardinalDirectionsList = typeof CardinalDirections

// Neat pattern from https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
// Indexing with `number` can be thought of as indexing with `all numbers` to get all the elements.
export type CardinalDirection = typedCardinalDirectionsList[number]

// CW = clockwise. CCW = counter-clockwise.
export enum RotationDirection {
    CW = 1,
    CCW = 2
}
