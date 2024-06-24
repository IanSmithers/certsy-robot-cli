import { program, command, Program } from "bandersnatch"

import { Robot } from "core/robot"
import { Table } from "core/table"

/**
 * A controlling class that manages the interactions
 * of a user and a robot navigating a table.
 * 
 * Uses bandersnatch to provide a simple REPL cli
 * that accepts commands and reports on state.
 */
export class Terminal {
    private readonly table: Table
    private readonly robot: Robot
    private readonly terminal: Program

    public constructor(table: Table, robot: Robot) {
        this.table = table
        this.robot = robot

        this.terminal = program()
        this.setupTerminal()
    }

    /**
     * This function adds all the supported
     * commands for the robot, but does not
     * start the cli.
     */
    private setupTerminal = () => {
        this.terminal
            .add(
                command("MOVE")
                    .action(async (_args) => {
                        this.robot.move(this.table.bounds)
                    })
            )

        this.terminal
            .add(
                command("LEFT")
                    .action(async (_args) => {
                        this.robot.left()
                    })
            )

        this.terminal
            .add(
                command("RIGHT")
                    .action(async (_args) => {
                        this.robot.right()
                    })
            )

        this.terminal
            .add(
                command("REPORT")
                    .action(async (_args) => {
                        this.robot.report()
                    })
            )

        this.terminal
            .add(
                command("PLACE")
                    .argument("input", {
                        variadic: true,
                    })
                    .action(async (args) => {
                        this.robot.place(args.input, this.table.bounds)
                    })
            )
    }

    /**
     * Starts the cli in REPL mode and also
     * provides a custom error handler
     * that will hide verbose stack traces.
     * 
     * NOTE: The pragma ignores this code from test coverage.
     * From: https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md
     */
    /* istanbul ignore next */
    public start() {
        // Print error message only (omit stack trace) and exit with a non-zero status
        const fail = (error: any) => {
            console.error("rejected:", String(error));

            if (!this.terminal.isRepl()) {
                process.exit(42);
            }
        };

        this.terminal
            .repl()
            .catch(fail)
    }

    /**
     * Provides the supplied command as an argument
     * to the run mode CLI. Will exit immediately.
     * Predominantly used for testing.
     * 
     * @param command 
     */
    public async runCommand(command: string) {
        await this.terminal
            .run(command)
    }
}