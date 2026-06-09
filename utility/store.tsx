import { UUID } from "crypto"
import { create } from "zustand"

export type Item = {
    id: string
    item: string
    quantity: bigint
    price: bigint
    assignedTo: string[]
    isShared: boolean
    _isDraft: boolean
}

export type BillState = {
    party: string[]
    tipPaid: bigint
    taxPaid: bigint
    items: Item[]
    addPerson: (name: string) => void
    removePerson: (name: string) => void
    addTip: (tip: bigint) => void
    addTax: (tax: bigint) => void
    addItem: (item: Item) => void
    updateItem: (item: Item) => void
    deleteItem: (id: string) => void
}

export const useBillStore = create<BillState>((set) => ({
    party: [],
    split: [],
    tipPaid: BigInt(0),
    taxPaid: BigInt(0),
    items: [],
    addPerson: (name: string) =>
        set((state) => {
            const trimmed = name.trim()
            if (!trimmed) {
                return state
            }
            const loweredName = trimmed.toLowerCase()
            if (state.party.includes(loweredName)) {
                return state
            }
            return {
                party: [...state.party, name],
            }
        }),
    removePerson: (name: string) =>
        set((state) => {
            return {
                party: state.party.filter((person) => person !== name),
            }
        }),
    addTip: (tip: bigint) =>
        set(() => {
            return {
                tipPaid: tip,
            }
        }),
    addTax: (tax: bigint) =>
        set(() => {
            return {
                taxPaid: tax,
            }
        }),
    addItem: (item: Item) => {
        set((state) => {
            return {
                items: [...state.items, item],
            }
        })
    },
    updateItem: (updatedItem: Item) => {
        set((state) => {
            return {
                items: state.items.map((item) => {
                    return item.id === updatedItem.id ? updatedItem : item
                }),
            }
        })
    },
    deleteItem: (id: string) => {
        set((state) => {
            return {
                items: state.items.filter((item) => {
                    return item.id !== id
                }),
            }
        })
    },
}))
