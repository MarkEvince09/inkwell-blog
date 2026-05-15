import yaml from 'js-yaml'

export function parseFrontmatter<T extends object>(
  raw: string,
): { data: T; content: string } {
  const text = raw.replace(/^\uFEFF/, '')

  if (!text.startsWith('---')) {
    return { data: {} as T, content: text }
  }

  const closingIndex = text.indexOf('\n---', 3)
  if (closingIndex === -1) {
    return { data: {} as T, content: text }
  }

  const yamlText = text.slice(4, closingIndex)
  let content = text.slice(closingIndex + 4)
  if (content.startsWith('\r\n')) content = content.slice(2)
  else if (content.startsWith('\n')) content = content.slice(1)

  const data = (yaml.load(yamlText) ?? {}) as T
  return { data, content }
}
