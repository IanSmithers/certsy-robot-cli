import { Robot } from "../Classes/Robot.ts"
import { Table } from "../Classes/Table.ts"
import { Terminal } from "../Classes/Terminal.ts"

const table = new Table(5, 5)
const robot = new Robot()
const terminal = new Terminal(table, robot)

describe("MOVE;LEFT;RIGHT;REPORT commands are all ignored when the robot is not on the table.", () => {
    test('test: issue MOVE command before robot is placed.', async () => {
        const consoleSpy = jest.spyOn(console, "log")

        await terminal.runCommand('MOVE')

        expect(consoleSpy).toHaveBeenCalledWith('Robot has not been placed yet. Please run "PLACE X:(number),Y(number),F(string)" at least once first.')
    })

    test('test: issue LEFT command before robot is placed.', async () => {
        const consoleSpy = jest.spyOn(console, "log")

        await terminal.runCommand('LEFT')

        expect(consoleSpy).toHaveBeenCalledWith('Robot has not been placed yet. Please run "PLACE X:(number),Y(number),F(string)" at least once first.')
    })

    test('test: issue RIGHT command before robot is placed.', async () => {
        const consoleSpy = jest.spyOn(console, "log")

        await terminal.runCommand('RIGHT')

        expect(consoleSpy).toHaveBeenCalledWith('Robot has not been placed yet. Please run "PLACE X:(number),Y(number),F(string)" at least once first.')
    })

    test('test: issue REPORT command before robot is placed.', async () => {
        const consoleSpy = jest.spyOn(console, "log")

        await terminal.runCommand('REPORT')

        expect(consoleSpy).toHaveBeenCalledWith('Robot has not been placed yet. Please run "PLACE X:(number),Y(number),F(string)" at least once first.')
    })
})

describe("PLACE;MOVE;LEFT;REPORT commands execute with correct final position.", () => {
    test('test: issue PLACE 1,2,EAST command and REPORT.', async () => {
        const consoleSpy = jest.spyOn(console, "log")

        await terminal.runCommand('PLACE 1,2,EAST')
        await terminal.runCommand('REPORT')

        expect(consoleSpy).toHaveBeenLastCalledWith('1,2 EAST')
    })

    test('test: issue PLACE 0,0,NORTH;MOVE commands and REPORT.', async () => {
        const consoleSpy = jest.spyOn(console, "log")

        await terminal.runCommand('PLACE 0,0,NORTH')
        await terminal.runCommand('MOVE')
        await terminal.runCommand('REPORT')

        expect(consoleSpy).toHaveBeenLastCalledWith('0,1 NORTH')
    })

    test('test: issue PLACE 0,0,NORTH;LEFT commands and REPORT.', async () => {
        const consoleSpy = jest.spyOn(console, "log")

        await terminal.runCommand('PLACE 0,0,NORTH')
        await terminal.runCommand('LEFT')
        await terminal.runCommand('REPORT')

        expect(consoleSpy).toHaveBeenLastCalledWith('0,0 WEST')
    })

    test('test: issue PLACE 1,2,EAST;MOVE;MOVE;LEFT;MOVE commands and REPORT.', async () => {
        const consoleSpy = jest.spyOn(console, "log")

        await terminal.runCommand('PLACE 1,2,EAST')
        await terminal.runCommand('MOVE')
        await terminal.runCommand('MOVE')
        await terminal.runCommand('LEFT')
        await terminal.runCommand('MOVE')
        await terminal.runCommand('REPORT')

        expect(consoleSpy).toHaveBeenLastCalledWith('3,3 NORTH')
    })
})