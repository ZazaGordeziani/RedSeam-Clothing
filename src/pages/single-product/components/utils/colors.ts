import colorName from 'color-name'

// Fallback map for non-standard colors
const customColors: Record<string, string> = {
    cream: '#FFFDD0',
    'navy blue': '#000080',
    peach: '#FFE5B4',
    'off white': '#F2F0EF',
    mauve: '#E0B0FF',
}

const softenColor = (rgb: number[], factor = 0.5): number[] => {
    // factor 0.5 means 50% toward white
    return rgb.map((c) => Math.round(c + (255 - c) * factor))
}

export const getColorHex = (name: string): string => {
    if (!name) return '#fff'

    const lower = name.toLowerCase()

    if (lower === 'multi' || lower === 'mixed') {
        return 'linear-gradient(to right, #FFA500, #FFFF66, #66FF66)'
    }

    if (customColors[lower]) return customColors[lower]

    const colTag = document.createElement('div')
    colTag.style.color = name
    if (colTag.style.color) return name

    const key = lower as keyof typeof colorName
    const rgb = colorName[key]
    if (rgb) {
        const softened = softenColor(rgb, 0.5)
        return `rgb(${softened.join(',')})`
    }

    return '#fff'
}
