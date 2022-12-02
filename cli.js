#!/usr/bin/env node
import meow from 'meow'
import path from 'node:path'

import { init } from './lib/init.js'
import { run } from './lib/run.js'

const cli = meow(
    `
    Usage:
        - Get the puzzle input for the desired day and generate a JS template to implement
        $ aoc init <day> -y <year>

        - Run the solutions implemented for the desired day
        $ aoc run <day>

    Options:
        --year, -y Year of the challenge (default: current year)
`,
    {
        importMeta: import.meta,
        flags: {
            year: {
                type: 'string',
                alias: 'y',
                default: new Date().getFullYear().toString(),
            },
        },
    }
)

const [command, day] = cli.input
const { year } = cli.flags

switch (command) {
    case 'init':
        {
            init(year, day)
        }
        break

    case 'run':
        {
            run(day, path.resolve(`day${day}`))
        }
        break

    default:
        cli.showHelp()
}
