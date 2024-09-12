const colorPalette = [
  'bg-red-100 text-red-900',
  'bg-blue-100 text-blue-900',
  'bg-green-100 text-green-900',
  'bg-yellow-100 text-yellow-900',
  'bg-purple-100 text-purple-900',
  'bg-pink-100 text-pink-900',
  'bg-indigo-100 text-indigo-900',
  'bg-teal-100 text-teal-900',
  'bg-orange-100 text-orange-900',
  'bg-cyan-100 text-cyan-900',
  'bg-gray-100 text-gray-900',
  'bg-cool-gray-100 text-cool-gray-900',
]


export function getRandomColor(id: string): string {
  const hash = id.split('').reduce((acc, char) => (char.charCodeAt(0) + ((acc << 5) - acc)), 0)
  const index = Math.abs(hash) % colorPalette.length
  return colorPalette[index]
}

export function getBadgeClass(value: string, type: string): string {
  let baseClass = getRandomColor(`${type}-${value}`)

  return `${baseClass} text-xs  mr-2 px-2 py-0.5 mx-3 rounded-full border border-current uppercase opacity-75`
}

export function getButtonClass(value: string, type: string): string {
  let baseClass = getRandomColor(`${type}-${value}`)

  return `${baseClass} text-sm font-medium mr-2 px-3 py-1.5 rounded-full hover:bg-opacity-90 transition-colors duration-200 border border-current`
}