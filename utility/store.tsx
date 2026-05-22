import {create} from "zustand";

type item = {
    name: string,
    price: number
}
type people = {
    name: string,
    items: item[]
}
type sharedItem = {
    people: string[],
    items: item[]
}

type BillState = {
    party: string[];
    split: sharedItem[];
    tipPaid: number,
    taxPaid: number,
    addPerson: (name: string) => void;
    removePerson: (name: string) => void;
    addSplit: (sharedItem: sharedItem) => void;
  };

export const useBillStore = create<BillState>( (set) => ({
    party: [],
    split: [],
    tipPaid: 0,
    taxPaid: 0,
    addPerson:  (name: string) => set( (state ) => {
        const trimmed = name.trim();
        if (!trimmed) {
            return state;
        }
        if (state.party.includes(trimmed)) {
            return state;
        }
        return {
            party: [...state.party, trimmed]
        }
    }),
    removePerson: (name: string) => set( state => {
        return {
            party: state.party.filter( person => person !== name )
        }
    }),
    addSplit: (sharedItem: sharedItem) => set( (state) => ({
        split: [...state.split, sharedItem],
    })),
}))