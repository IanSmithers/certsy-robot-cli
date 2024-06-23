import { getDirectionData, isInBounds, isValueCardinalDirection, rotateDirection } from "../helpers/helpers"
import { Bounds, Vector2D, CardinalDirection, RotationDirection } from '../types/custom-types.ts'

describe('isInBounds/2', () => {
    const bounds: Bounds = { minX: 0, minY: 0, maxX: 10, maxY: 25 }
    const xInBounds: number = 2
    const yInBounds: number = 7
    const xOutOfBounds: number = 12
    const yOutOfBounds: number = 27
    const xNegative: number = -5
    const yNegative: number = -15

    test('positive position, both x and y in bounds', () => {
        const position: Vector2D = { x: xInBounds, y: yInBounds }

        expect(isInBounds(bounds, position)).toBe(true)
    })

    test('positive position, only x in bounds', () => {
        const position: Vector2D = { x: xInBounds, y: yOutOfBounds }

        expect(isInBounds(bounds, position)).toBe(false)
    })

    test('positive position, only y in bounds', () => {
        const position: Vector2D = { x: xOutOfBounds, y: yInBounds }

        expect(isInBounds(bounds, position)).toBe(false)
    })

    test('positive position, neither x nor y in bounds', () => {
        const position: Vector2D = { x: xOutOfBounds, y: yOutOfBounds }

        expect(isInBounds(bounds, position)).toBe(false)
    })

    test('negative position, neither x nor y in bounds', () => {
        const position: Vector2D = { x: xNegative, y: yNegative }

        expect(isInBounds(bounds, position)).toBe(false)
    })
})

describe('rotateDirection/2', () => {
    const currentDirectionNorth: CardinalDirection = 'NORTH'
    const currentDirectionEast: CardinalDirection = 'EAST'
    const currentDirectionSouth: CardinalDirection = 'SOUTH'
    const currentDirectionWest: CardinalDirection = 'WEST'

    test('rotate CW from NORTH', () => {
        expect(rotateDirection(currentDirectionNorth, RotationDirection.CW)).toBe('EAST')
    })

    test('rotate CW from EAST', () => {
        expect(rotateDirection(currentDirectionEast, RotationDirection.CW)).toBe('SOUTH')
    })

    test('rotate CW from SOUTH', () => {
        expect(rotateDirection(currentDirectionSouth, RotationDirection.CW)).toBe('WEST')
    })

    test('rotate CW from WEST', () => {
        expect(rotateDirection(currentDirectionWest, RotationDirection.CW)).toBe('NORTH')
    })

    test('rotate CCW from NORTH', () => {
        expect(rotateDirection(currentDirectionNorth, RotationDirection.CCW)).toBe('WEST')
    })

    test('rotate CCW from WEST', () => {
        expect(rotateDirection(currentDirectionWest, RotationDirection.CCW)).toBe('SOUTH')
    })

    test('rotate CCW from SOUTH', () => {
        expect(rotateDirection(currentDirectionSouth, RotationDirection.CCW)).toBe('EAST')
    })

    test('rotate CCW from EAST', () => {
        expect(rotateDirection(currentDirectionEast, RotationDirection.CCW)).toBe('NORTH')
    })
})

describe('getDirectionData/1', () => {
    test('get direction data for NORTH', () => {
        expect(getDirectionData('NORTH')).toStrictEqual({ x: 0, y: 1 })
    })

    test('get direction data for EAST', () => {
        expect(getDirectionData('EAST')).toStrictEqual({ x: 1, y: 0 })
    })

    test('get direction data for SOUTH', () => {
        expect(getDirectionData('SOUTH')).toStrictEqual({ x: 0, y: -1 })
    })

    test('get direction data for WEST', () => {
        expect(getDirectionData('WEST')).toStrictEqual({ x: -1, y: 0 })
    })
})

describe('isValueCardinalDirection/1', () => {
    test('NORTH', () => {
        expect(isValueCardinalDirection('NORTH')).toBe(true)
    })

    test('EAST', () => {
        expect(isValueCardinalDirection('EAST')).toBe(true)
    })

    test('SOUTH', () => {
        expect(isValueCardinalDirection('SOUTH')).toBe(true)
    })

    test('WEST', () => {
        expect(isValueCardinalDirection('WEST')).toBe(true)
    })

    test('UP', () => {
        expect(isValueCardinalDirection('UP')).toBe(false)
    })

    test('', () => {
        expect(isValueCardinalDirection('')).toBe(false)
    })
})