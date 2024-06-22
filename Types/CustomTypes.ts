export type Bounds = {
    minX: number,
    minY: number,
    maxX: number,
    maxY: number
}

export type Vector2D = {
    x: number,
    y: number
}

export type Transform = {
    position: Vector2D,
    direction: CardinalDirection
}

// CardinalDirection
const CardinalDirections = ['NORTH', 'EAST', 'SOUTH', 'WEST'] as const
type typedCardinalDirectionsList = typeof CardinalDirections

// Neat pattern from https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html
// Indexing with `number` can be thought of as indexing with `all numbers` to get all the elements.
export type CardinalDirection = typedCardinalDirectionsList[number]

export const isValueCardinalDirection = (value: string): value is CardinalDirection => {
    return CardinalDirections.includes(value as CardinalDirection)
}

export enum RotationDirection {
    CW = 1,
    CCW = 2
}
