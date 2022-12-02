import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import fetch from 'node-fetch'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function init(year, day) {
    const env = fs.readFileSync(path.resolve('.env'), 'utf8')
    const target = `https://adventofcode.com/${year}/day/${day}/input`
    const result = await fetch(target, {
        headers: { Cookie: `session=${env.trim()}` },
    })

    if (result.ok) {
        const dirPath = path.resolve(`day${day}`)
        const indexPath = path.join(dirPath, 'index.js')
        const inputPath = path.join(dirPath, 'input.txt')

        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath)
        }

        if (!fs.existsSync(indexPath)) {
            fs.copyFileSync(path.join(__dirname, 'template.js'), indexPath)
        }

        if (!fs.existsSync(inputPath)) {
            const input = await result.text()

            fs.writeFileSync(inputPath, input, { encoding: 'utf8' })
        }

        console.log(`Created:\n- ${indexPath}\n- ${inputPath}`)
        console.log('Done.')
    } else {
        console.error(
            `Fetch error on ${target}: ${result.status} ${result.statusText}`
        )
    }
}
