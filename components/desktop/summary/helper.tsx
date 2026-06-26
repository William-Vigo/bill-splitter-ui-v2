import { item, name, Payload, people, sharedItem } from "@/utility/processSplit"
import { BillState } from "@/utility/store"

export function getPayloadFromBillStore(billStore: BillState): Payload {
    const grouped = billStore.items.reduce<Record<string, item[]>>(
        (acc, value) => {
            // skip shared items
            if (value.isShared) {
                return acc
            }
            value.assignedTo.forEach((person) => {
                if (!acc[person]) {
                    acc[person] = []
                }
                if (value.assignedTo.length === Number(value.quantity)) {
                    acc[person].push({
                        itemName: value.item,
                        price: Number(value.price),
                        quantity: Number(1),
                        total: Number(0),
                    })
                    return acc
                }
                if (value.assignedTo.length === 1) {
                    acc[person].push({
                        itemName: value.item,
                        price: Number(value.price),
                        quantity: Number(value.quantity),
                        total: Number(0),
                    })
                    return acc
                }
            })
            return acc
        },
        {}
    )
    const people: people[] = Object.entries(grouped).map(([name, value]) => {
        return {
            name: name,
            items: value,
        }
    })
    const shared = billStore.items
        .filter((item) => {
            return item.isShared
        })
        .map<sharedItem>((item) => {
            const assigned = item.assignedTo.map<name>((name) => {
                return {
                    name: name,
                }
            })
            return {
                people: assigned,
                items: [
                    {
                        itemName: item.item,
                        price: Number(item.price),
                        quantity: Number(item.quantity),
                        total: Number(0),
                    },
                ],
            }
        })
    return {
        people: people,
        sharedItems: shared,
        taxPaid: Number(billStore.taxPaid),
        tipPaid: Number(billStore.tipPaid),
    }
}
