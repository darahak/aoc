import fs from 'node:fs'
import path from 'node:path'

import clipboard from 'clipboardy'

export async function run(day, dayAbsPath) {
    const { first, second } = await import(`${dayAbsPath}/index.js`)
    const input = fs.readFileSync(path.join(dayAbsPath, 'input.txt'), {
        encoding: 'utf8',
    })

    const firstStart = Date.now()
    const firstResult = first(input)
    const firstDuration = (Date.now() - firstStart) / 1000

    if (firstResult != null) {
        clipboard.writeSync(firstResult)

        console.log(
            `Result for day ${day} part 1: ${firstResult} in ${firstDuration} seconds (copied to clipboard)`
        )
    } else {
        console.log(`Result for day ${day} part 1: none`)
    }

    const secondStart = Date.now()
    const secondResult = second(input)
    const secondDuration = (Date.now() - secondStart) / 1000

    if (secondResult != null) {
        clipboard.writeSync(secondResult)

        console.log(
            `Result for day ${day} part 2: ${secondResult} in ${secondDuration} seconds (copied to clipboard)`
        )
    } else {
        console.log(`Result for day ${day} part 2: none`)
    }
}
