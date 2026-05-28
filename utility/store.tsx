import { UUID } from "crypto"
import { create } from "zustand"

export type Item = {
    id: string
    item: string
    quantity: number
    price: number
    assignedTo: string[]
    isShared: boolean
    _isDraft: boolean
}

type BillState = {
    party: string[]
    tipPaid: number
    taxPaid: number
    items: Item[]
    itemTotal: number
    addPerson: (name: string) => void
    removePerson: (name: string) => void
    addTip: (tip: number) => void
    addTax: (tax: number) => void
    addItem: (item: Item) => void
    updateItem: (item: Item) => void
    deleteItem: (id: string) => void
}

export const useBillStore = create<BillState>((set) => ({
    party: [],
    split: [],
    tipPaid: 0,
    taxPaid: 0,
    items: [],
    itemTotal: 0,
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
    addTip: (tip: number) =>
        set(() => {
            return {
                tipPaid: tip,
            }
        }),
    addTax: (tax: number) =>
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
