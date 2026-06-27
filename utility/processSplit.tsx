import { Receipt } from "@/components/desktop/receipt"

export type item = {
    itemName: string
    price: number
    quantity: number
    total: number
}
export type people = {
    name: string
    items: item[]
}
export type name = {
    name: string
}
export type sharedItem = {
    people: name[]
    items: item[]
}
export type Payload = {
    people: people[]
    sharedItems: sharedItem[]
    tipPaid: number
    taxPaid: number
}

export type Resp = {
    people: Receipt[]
    billTotal: bigint
}

function sanitizeResponse(response: Resp): Resp {
    if (!response) {
        return { people: [], billTotal: BigInt(0) }
    }
    response.people = response.people.map((person) => ({
        name: person.name,
        items: (person.items ?? []).map((item) => ({
            itemName: item.itemName,
            price: BigInt(item.price),
            quantity: BigInt(item.quantity),
            total: BigInt(item.total),
        })),
        sharedItems: (person.sharedItems ?? []).map((item) => ({
            itemName: item.itemName,
            price: BigInt(item.price),
            quantity: BigInt(item.quantity),
            total: BigInt(item.total),
        })),
        tax: BigInt(person.tax),
        tip: BigInt(person.tip),
        total: BigInt(person.total),
        itemSum: BigInt(person.itemSum),
    }))
    return response
}

export async function GetSplit(payload: Payload): Promise<Resp> {
    //const payload = getPayloadFromBillStore(billStore)
    const response = await fetch("/split-bill", {
        method: "POST",
        body: JSON.stringify(payload),
    })

    const data = (await response.json()) as Resp
    return sanitizeResponse(data)
}
