import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { DirnameTranslateMap } from './dirname-translate.ts'
import { sidebarCache } from './sidebar-cache.ts'
import { getDirs, getMDFiles, stringifyWithTrailingCommas } from './utils.ts'
import { nav } from './nav.ts'

const __dirname = import.meta.dirname

/** 解析 nav，返回 { 一级目录名: 有序子目录名[] }（去重，保持声明顺序） */
const extractNavOrder = (items: any[]): Record<string, string[]> => {
  const map: Record<string, string[]> = {}
  items.forEach(item => {
    if (!Array.isArray(item.items)) return
    item.items.forEach((sub: any) => {
      const [top, subDir] = sub.link?.split('/').filter(Boolean) || []
      if (!top || !subDir) return
      ;(map[top] ??= []).push(subDir)
    })
  })
  return map
}

export const excludeDir = ['.vitepress', 'public']
const sidebar: Record<string, any> = {}

const sidebarJson: Record<string, any> = {}
// 顶层子目录顺序按 nav 声明顺序排列，nav 中未出现的子目录排到末尾
const navDirOrder = extractNavOrder(nav)
const orderIndex = (order: string[] | undefined, name: string) => {
  const idx = order?.indexOf(name) ?? -1
  return idx === -1 ? Number.MAX_SAFE_INTEGER : idx
}

getDirs('./docs').forEach(d => {
  const subDirs = getDirs(`./docs/${d.name}`).sort(
    (a, b) => orderIndex(navDirOrder[d.name], a.name) - orderIndex(navDirOrder[d.name], b.name)
  )
  sidebar[`/${d.name}`] = subDirs.map(subDir => {
    const subDirPath = `./docs/${d.name}/${subDir.name}` as keyof typeof sidebarCache
    let globalIdx = sidebarCache[subDirPath]?.filter(Boolean).length || 0

    const files = getMDFiles(subDirPath)
      .map(md => {
        const name = md.name.replace('.md$', '')
        const link = `/${d.name}/${subDir.name}/${name}`
        const idx = sidebarCache[subDirPath]?.indexOf(name) ?? globalIdx++

        return {
          idx,
          name,
          link,
        }
      })
      .sort((a, b) => a.idx - b.idx)

    sidebarJson[subDirPath] = files.map(file => file.name)

    return {
      text: DirnameTranslateMap[subDir.name as keyof typeof DirnameTranslateMap] || subDir.name,
      collapsed: true,
      items: files.map((file, idx) => {
        return {
          text: `${idx + 1}. ${file.name}`,
          link: file.link,
        }
      }),
    }
  })
})

writeFileSync(
  resolve(__dirname, 'sidebar-cache.ts'),
  `export const sidebarCache = ${stringifyWithTrailingCommas(sidebarJson, 2)};`
)

export { sidebar }
