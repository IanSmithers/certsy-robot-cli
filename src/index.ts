/** Entry Point */

import { Robot } from "core/robot.ts"
import { Table } from "core/table.ts"
import { Terminal } from "core/terminal.ts"

const table = new Table(4, 4) // Origin is 0,0. This results in 25 possible coordinates.
const robot = new Robot()
const terminal = new Terminal(table, robot)

terminal.start()