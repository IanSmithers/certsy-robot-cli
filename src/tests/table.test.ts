
import { Table } from "components/table";

import { Bounds } from "types/custom-types";

describe('table ctor bounds', () => {
    test('non-zero coordinate magnitudes', () => {
        const table = new Table(5, 5)

        expect(table.bounds).toStrictEqual<Bounds>({ minX: 0, maxX: 5, minY: 0, maxY: 5 })
    })

    test('non-zero unequal coordinate magnitudes', () => {
        const table = new Table(20, 42)

        expect(table.bounds).toStrictEqual<Bounds>({ minX: 0, maxX: 20, minY: 0, maxY: 42 })
    })

    test('negative magnitudes are invalid and throw a RangeError', () => {
        const creatInvalidTable = () => {
            new Table(-5, 10)
        }

        expect(creatInvalidTable).toThrow()
    })

    test('negative magnitudes are invalid and throw a RangeError', () => {
        const creatInvalidTable = () => {
            new Table(5, -10)
        }

        expect(creatInvalidTable).toThrow()
    })
})