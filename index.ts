/** Entry Point */

import { Robot } from "./components/robot.ts"
import { Table } from "./components/table.ts"
import { Terminal } from "./components/terminal.ts"

const table = new Table(4, 4) // Origin is 0,0. This results in 25 possible coordinates.
const robot = new Robot()
const terminal = new Terminal(table, robot)

terminal.start()