/** Entry Point */

import { Robot } from "./Classes/Robot.ts"
import { Table } from "./Classes/Table.ts"
import { Terminal } from "./Classes/Terminal.ts"

const table = new Table(5, 5)
const robot = new Robot()
const terminal = new Terminal(table, robot)

terminal.start()