import { Bounds, Vector2D, CardinalDirection, RotationDirection } from '../Types/CustomTypes.ts'

export const isInBounds = (bounds: Bounds, coordinateData: Vector2D) => {
    return (
        (coordinateData.x >= 0 && coordinateData.x < bounds.minX + bounds.maxX) &&
        (coordinateData.y >= 0 && coordinateData.y < bounds.minY + bounds.maxY)
    )
}

const facingNameToDirectionMap: { [key: string]: Vector2D } = {
    'NORTH': { x: 0, y: 1 },
    'EAST': { x: 1, y: 0 },
    'SOUTH': { x: 0, y: -1 },
    'WEST': { x: -1, y: 0 }
}

const numberOfCardinalDirections = 4
const cwDirection = 1
const ccwDirection = -1
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
