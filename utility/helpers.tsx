export const formatMoney = (cents: bigint) => {
    const dollars = cents / BigInt(100)
    const centsPart = (cents % BigInt(100)).toString().padStart(2, "0")

    return `${dollars}.${centsPart}`
}
