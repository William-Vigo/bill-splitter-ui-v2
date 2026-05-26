import { create } from "zustand"

type item = {
    name: string
    price: number
}
type people = {
    name: string
    items: item[]
}
type sharedItem = {
    people: string[]
    items: item[]
}

type BillState = {
    party: string[]
    tipPaid: number
    taxPaid: number
    itemTotal: number
    addPerson: (name: string) => void
    removePerson: (name: string) => void
    addTip: (tip: number) => void
    addTax: (tax: number) => void
}

export const useBillStore = create<BillState>((set) => ({
    party: [],
    split: [],
    tipPaid: 0,
    taxPaid: 0,
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
}))
