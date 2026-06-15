export const formatMoney = (cents: bigint) => {
    const dollars = cents / BigInt(100)
    const centsPart = (cents % BigInt(100)).toString().padStart(2, "0")

    return `${dollars}.${centsPart}`
}

const colorCache = new Map<string, string>()

//TODO: fix color generator so its not identical with other names
export function stringToColor(name: string) {
    let hash = 0
    if (colorCache.has(name)) {
        return colorCache.get(name)
    }
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    const hue = Math.abs(hash) % 360
    const color = `hsl(${hue}, 60%, 35%)`
    colorCache.set(name, color)
    console.log(colorCache)
    return color
}

export function stringAvatar(name: string) {
    const first = name.split(" ")[0]?.[0].toUpperCase() ?? ""
    const last = name.split(" ")[1]?.[0].toUpperCase() ?? ""
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${first}${last}`,
    }
}
