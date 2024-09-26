import { defineEventHandler } from 'h3'
import fs from 'fs'
import path from 'path'

interface NavItem {
    title: string
    path: string
    children?: NavItem[]
}

function getNavigation(dir: string, basePath: string = '/docs'): NavItem[] {
    const items: NavItem[] = []
    const files = fs.readdirSync(dir)

    for (const file of files) {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
            const children = getNavigation(filePath, `${basePath}/${file}`)
            if (children.length > 0) {
                items.push({
                    title: file,
                    path: `${basePath}/${file}`,
                    children
                })
            }
        } else if (path.extname(file) === '.md') {
            const title = path.basename(file, '.md')
            items.push({
                title: title === 'index' ? 'Introduction' : title.replace(/-/g, ' '),
                path: `${basePath}/${title === 'index' ? '' : title}`
            })
        }
    }

    return items
}

export default defineEventHandler(() => {
    const docsDir = path.join(process.cwd(), 'content/docs')
    return getNavigation(docsDir)
})