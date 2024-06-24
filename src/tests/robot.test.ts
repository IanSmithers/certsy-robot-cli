
import { Bounds } from "types/custom-types"
import { Robot } from "core/robot"


const bounds: Bounds = { minX: 0, maxX: 10, minY: 0, maxY: 5 }

describe('move/1.', () => {
    test('MOVE command', () => {
        const consoleSpy = jest.spyOn(console, "log")

        new Robot().move(bounds)

        expect(consoleSpy).toHaveBeenCalledWith('Robot has not been placed yet. Please run "PLACE (number),(number),(string)" at least once first.')
    })

    test('PLACE;MOVE;REPORT', () => {
        const consoleSpy = jest.spyOn(console, "log")

        const robot = new Robot()
        robot.place(['0,0,EAST'], bounds)
        robot.move(bounds)
        robot.report()


        expect(consoleSpy).toHaveBeenLastCalledWith('1,0 EAST')
    })

    test('PLACE;MOVE to x boundary and REPORT', () => {
        const consoleSpy = jest.spyOn(console, "log")

        const robot = new Robot()
        robot.place(['0,0,EAST'], bounds)

        // Move 5 on the x axis to the halfway point.
        robot.move(bounds)
        robot.move(bounds)
        robot.move(bounds)
        robot.move(bounds)
        robot.move(bounds)

        // Move the final 5 to the boundary.
        robot.move(bounds)
        robot.move(bounds)
        robot.move(bounds)
        robot.move(bounds)
        robot.move(bounds)

        robot.report()

        expect(consoleSpy).toHaveBeenLastCalledWith('10,0 EAST')
    })

    test('PLACE;MOVE to x boundary and REPORT', () => {
        const consoleSpy = jest.spyOn(console, "log")

        const robot = new Robot()
        robot.place(['0,0,NORTH'], bounds)

        // Move 5 on the y axis to the boundary.
        robot.move(bounds)
        robot.move(bounds)
        robot.move(bounds)
        robot.move(bounds)
        robot.move(bounds)

        robot.report()

        expect(consoleSpy).toHaveBeenLastCalledWith('0,5 NORTH')
    })
})

describe('left/0', () => {
    test('LEFT command', () => {
        const consoleSpy = jest.spyOn(console, "log")

        new Robot().left()

        expect(consoleSpy).toHaveBeenCalledWith('Robot has not been placed yet. Please run "PLACE (number),(number),(string)" at least once first.')
    })

    test('PLACE;LEFT;REPORT', () => {
        const consoleSpy = jest.spyOn(console, "log")

        const robot = new Robot()
        robot.place(['0,0,EAST'], bounds)
        robot.left()
        robot.report()


        expect(consoleSpy).toHaveBeenLastCalledWith('0,0 NORTH')
    })
})

describe('right/0', () => {
    test('RIGHT command', () => {
        const consoleSpy = jest.spyOn(console, "log")

        new Robot().right()

        expect(consoleSpy).toHaveBeenCalledWith('Robot has not been placed yet. Please run "PLACE (number),(number),(string)" at least once first.')
    })

    test('PLACE;RIGHT;REPORT', () => {
        const consoleSpy = jest.spyOn(console, "log")

        const robot = new Robot()
        robot.place(['0,0,SOUTH'], bounds)
        robot.right()
        robot.report()


        expect(consoleSpy).toHaveBeenLastCalledWith('0,0 WEST')
    })
})

describe('report/0.', () => {
    test('REPORT command', () => {
        const consoleSpy = jest.spyOn(console, "log")

        new Robot().report

        expect(consoleSpy).toHaveBeenCalledWith('Robot has not been placed yet. Please run "PLACE (number),(number),(string)" at least once first.')
    })

    test('PLACE;MOVE;REPORT', () => {
        const consoleSpy = jest.spyOn(console, "log")

        const robot = new Robot()
        robot.place(['0,0,WEST'], bounds)
        robot.report()


        expect(consoleSpy).toHaveBeenLastCalledWith('0,0 WEST')
    })
})

describe('place/1.', () => {
    const logSpy = jest.spyOn(console, "log")
    const warnSpy = jest.spyOn(console, "warn")
    const errorSpy = jest.spyOn(console, "error")

    const resetSpies = () => {
        logSpy.mockClear()
        warnSpy.mockClear()
        errorSpy.mockClear()
    }

    test('PLACE command', () => {
        resetSpies()

        const robot = new Robot()
        robot.place(['1,4,NORTH'], bounds)
        robot.report()

        expect(logSpy).toHaveBeenLastCalledWith('1,4 NORTH')
    })

    test('PLACE command with invalid cardinal direction', () => {
        resetSpies()

        const robot = new Robot()
        robot.place(['2,0,NOTADIRECTION'], bounds)
        robot.report()

        expect(errorSpy).toHaveBeenLastCalledWith('parsePlaceCommandData failed, data did not contain a cardinal direction.')
    })

    test('PLACE command with invalid x and y values', () => {
        resetSpies()

        const robot = new Robot()
        robot.place(['A,B,WEST'], bounds)
        robot.report()

        expect(errorSpy).toHaveBeenLastCalledWith('parsePlaceCommandData failed, data was malformed.')
    })

    test('PLACE command with missing x and y values', () => {
        resetSpies()

        const robot = new Robot()
        robot.place([',,WEST'], bounds)
        robot.report()

        expect(errorSpy).toHaveBeenLastCalledWith('parsePlaceCommandData failed, data was malformed.')
    })

    test('PLACE command with missing x and y values', () => {
        resetSpies()

        const robot = new Robot()
        robot.place(['WEST'], bounds)
        robot.report()

        expect(errorSpy).toHaveBeenLastCalledWith('parsePlaceCommandData failed, data was incorrect length.')
    })

    test('PLACE command with a missing y value', () => {
        resetSpies()

        const robot = new Robot()
        robot.place(['0 WEST'], bounds)
        robot.report()

        expect(errorSpy).toHaveBeenLastCalledWith('parsePlaceCommandData failed, data was incorrect length.')
    })

    test('PLACE command with too many values', () => {
        resetSpies()

        const robot = new Robot()
        robot.place(['1,2,3,4,WEST'], bounds)
        robot.report()

        expect(errorSpy).toHaveBeenLastCalledWith('parsePlaceCommandData failed, data was incorrect length.')
    })

    test('PLACE command with x and y outside of bounds', () => {
        resetSpies()

        const robot = new Robot()
        robot.place(['100,200,WEST'], bounds)
        robot.report()

        expect(warnSpy).toHaveBeenLastCalledWith('Placement position is outside of the bounds. Must be within X:0 to 10 and Y:0 to 5.')
    })

    test('PLACE command with additional data', () => {
        resetSpies()

        const robot = new Robot()
        robot.place(['0,2,SOUTH', '0123456789'], bounds)
        robot.report()

        expect(warnSpy).toHaveBeenLastCalledWith('Placement command must be in the form of "PLACE X,Y,F".')
    })
})