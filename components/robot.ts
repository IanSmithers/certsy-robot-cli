import { Bounds, RotationDirection, Transform, Vector2D } from "../types/custom-types.ts";
import { getDirectionData, isInBounds, rotateDirection, isValueCardinalDirection } from "../helpers/helpers.ts";

/**
 * A class that represents a robot with some basic
 * functionality. The robot supports a series of commands
 * and can move, rotate and report its current position
 * and direction.
 */
export class Robot {
    private readonly transform: Transform = { position: { x: 0, y: 0 }, direction: 'NORTH' }
    private placed: boolean = false
    private readonly unplacedErrorStr: string = 'Robot has not been placed yet. Please run "PLACE (number),(number),(string)" at least once first.'

    public constructor() { }

    /**
     * Move the robot in the direction facing if able.
     * 
     * @param bounds 
     */
    public move = (bounds: Bounds) => {
        if (this.placed) this.executeMoveCommand(bounds)
        else console.log(this.unplacedErrorStr)
    }

    /**
     * Turn 90 degrees counter-clockwise.
     */
    public left = () => {
        if (this.placed) this.executeLeftCommand()
        else console.log(this.unplacedErrorStr)
    }

    /**
     * Turn 90 degress clockwise.
     */
    public right = () => {
        if (this.placed) this.executeRightCommand()
        else console.log(this.unplacedErrorStr)
    }

    /**
     * Report the current position and direction to the console.
     */
    public report = () => {
        if (this.placed) this.executeReportCommand()
        else console.log(this.unplacedErrorStr)
    }

    /**
     * Places the robot at the supplied position if able.
     * Will point the robot in the supplied direction.
     * 
     * NOTE: A robot must be placed before any other
     * commands are accepted.
     * 
     * @param input 
     * @param bounds 
     */
    public place = (input: string[], bounds: Bounds) => {
        this.executePlaceCommand(input, bounds)
    }

    private executeMoveCommand = (bounds: Bounds) => {
        const directionData = getDirectionData(this.transform.direction)
        const newPosition: Vector2D = {
            x: directionData.x + this.transform.position.x,
            y: directionData.y + this.transform.position.y
        }

        if (isInBounds(bounds, newPosition)) {
            this.transform.position = newPosition
        }
    }

    private executeLeftCommand = () => {
        const rotatedDirection = rotateDirection(this.transform.direction, RotationDirection.CCW)
        this.transform.direction = rotatedDirection
    }

    private executeRightCommand = () => {
        const rotatedDirection = rotateDirection(this.transform.direction, RotationDirection.CW)
        this.transform.direction = rotatedDirection
    }

    private executeReportCommand = () => {
        console.log(this.transform.position.x + ',' + this.transform.position.y + ' ' + this.transform.direction)
    }

    /**
     * Processes the supplied data to extract:
     * - X: the x coordinate position to place the robot.
     * - Y: the y coordinate position to place the robot.
     * - F: the facing direction to point the robot in.
     * 
     * @param data 
     * @returns 
     */
    private parsePlaceCommandData = (data: string[]) => {
        if (data.length === 3) {
            try {
                const coordinates: Vector2D = { x: parseInt(data[0]), y: parseInt(data[1]) }
                const facing = data[2]
                if (isValueCardinalDirection(facing)) {
                    const transform: Transform = { position: coordinates, direction: facing }

                    return transform
                }
                else {
                    console.error('parsePlaceCommandData failed, data did not contain a cardinal direction.')
                }
            }
            catch {
                console.error('parsePlaceCommandData failed, data was malformed.')
            }
        } else {
            console.error('parsePlaceCommandData failed, data was incorrect length.')
        }
    }

    /**
     * Composites the necessary data from the incoming command input
     * and bounds to place the robot and update the internal state.
     * 
     * @param input 
     * @param bounds 
     */
    private executePlaceCommand = (input: string[], bounds: Bounds) => {
        if (input.length === 1) {
            const data = input[0]
                .trim()
                .split(',')

            const result = this.parsePlaceCommandData(data)

            if (result != null) {
                const coordinateData = result.position

                if (isInBounds(bounds, coordinateData)) {
                    const facingData = result.direction

                    if (facingData != null) {
                        this.transform.direction = facingData
                        this.transform.position = coordinateData
                        this.placed = true
                    }
                }
                else {
                    console.warn(`Placement position is outside of the bounds. Must be within X:${bounds.minX} to ${bounds.maxX} and Y:${bounds.minY} to ${bounds.maxY}.`)
                }
            }
            else {
                console.error('Placement parse result is undefined.')
            }
        }
        else {
            console.warn('Placement command must be in the form of "PLACE X,Y,F".')
        }
    }
}