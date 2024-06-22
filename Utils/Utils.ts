import { Bounds, Vector2D, CardinalDirection, RotationDirection } from '../Types/CustomTypes.ts'

/**
 * Calculates whether a 2D position represented by a two point
 * coordinate vector is contained within the supplied bounds.
 *
 * @param bounds 
 * @param position 
 * @returns
 */
export const isInBounds = (bounds: Bounds, position: Vector2D) => {
    return (
        (position.x >= 0 && position.x < bounds.minX + bounds.maxX) &&
        (position.y >= 0 && position.y < bounds.minY + bounds.maxY)
    )
}

/**
 * This map is used to determine the positional adjustment in a direction.
 * 
 * Keys are a string representation of a cardinal direction.
 * Values are a two point vector that represents movement in a direction.
 * 
 * NOTE: Order is important. The map is created in order so that
 * each direction follows clockwise from the next. Must be kept in
 * parity with the custom CardinalDirection type.
 */
const facingNameToDirectionMap: { [key: string]: Vector2D } = {
    'NORTH': { x: 0, y: 1 },
    'EAST': { x: 1, y: 0 },
    'SOUTH': { x: 0, y: -1 },
    'WEST': { x: -1, y: 0 }
}

// Represents the number of cardinal directions.
const numberOfCardinalDirections = 4
// Represents the index increment for a clockwise direction move through the array.
const cwDirection = 1
// Represents the index increment for a counter-clockwise direction move through the array.
const ccwDirection = -1

/**
 * * Calculates the resultant direction from the incoming cardinal direction
 * and a rotation. Uses modulo to wrap the indeces of the facingNameToDirectionMap
 * and retrieve the new direciton.
 * 
 * @param currentDirection 
 * @param rotation 
 * @returns 
 */
export const rotateDirection = (currentDirection: CardinalDirection, rotation: RotationDirection) => {
    const keys = Object.keys(facingNameToDirectionMap)
    const currentIndex = keys.indexOf(currentDirection.toString())

    switch (rotation) {
        case RotationDirection.CW:
            const cwRotatedIndex = (currentIndex + numberOfCardinalDirections + cwDirection) % numberOfCardinalDirections
            return keys[cwRotatedIndex] as CardinalDirection

        case RotationDirection.CCW:
            const ccwRotatedIndex = (currentIndex + numberOfCardinalDirections + ccwDirection) % numberOfCardinalDirections
            return keys[ccwRotatedIndex] as CardinalDirection
        default:
            return currentDirection
            break;
    }
}

/**
 * With a supplied cardinal direction this function will look up
 * the vector that represents movement in that direction.
 * 
 * @param facingDirection 
 * @returns 
 */
export const getDirectionData = (facingDirection: CardinalDirection) => {
    try {
        const result = facingNameToDirectionMap[facingDirection]
        return result
    }
    catch {
        console.error(`getFacingValue failed, unsupported facing direction (${facingDirection}) specified.`)
        return { x: 0, y: 0 }
    }
}
