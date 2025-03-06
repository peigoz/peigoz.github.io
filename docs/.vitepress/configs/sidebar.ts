import { readdirSync } from 'node:fs';
import { DirnameTranslateMap } from './dirname-translate.ts'

const excludeDir = ['.vitepress', 'public']
const sidebar = {}

const getDirs = (path) => {
  return readdirSync(path, { withFileTypes: true })
  .filter(d => d.isDirectory() && !excludeDir.includes(d.name))
}
const getMDFiles = (path) => {
  return readdirSync(path, { withFileTypes: true })
  .filter(f => f.isFile() && f.name.endsWith('.md'))
}

getDirs('./docs').forEach(d => {
    sidebar[`/${d.name}`] = getDirs(`./docs/${d.name}`).map(subDir => {
        return {
            text: DirnameTranslateMap[subDir.name] || subDir.name,
            collapsed: true,
            items: getMDFiles(`./docs/${d.name}/${subDir.name}`).map((md,idx) => {
              const name = md.name.replace('\.md$', '')
                return {
                    text: `${idx+1}. ${name}`,
                    link: `/${d.name}/${subDir.name}/${name}`
                }
            })
        }
    })
  })

export { sidebar }
