/** Entry Point */

import { Robot } from "./components/robot.ts"
import { Table } from "./components/table.ts"
import { Terminal } from "./components/terminal.ts"

const table = new Table(5, 5)
const robot = new Robot()
const terminal = new Terminal(table, robot)

terminal.start()