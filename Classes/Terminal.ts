import { program, command, Program } from "bandersnatch"

import { Robot } from "./Robot.ts"
import { Table } from "./Table.ts"

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

    public start() {
        // Print error message only (omit stack trace) and exit with a meaningful status
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

    public async runCommand(command: string) {
        await this.terminal
            .run(command)
    }
}