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
    party: Record<string, people>;
    split: sharedItem[];
    tipPaid: number,
    taxPaid: number,
    addPerson: (name: string) => void;
    addSplit: (sharedItem: sharedItem) => void;
  };

export const useBillStore = create<BillState>( (set) => ({
    party: {},
    split: [],
    tipPaid: 0,
    taxPaid: 0,
    addPerson:  (name: string) => set( (state ) => {
        const trimmed = name.trim();
        if (!trimmed) {
            return state;
        }
        if (state.party[trimmed]) {
            return state;
        }
        return {
            party: {
                ...state.party,
                [name]: {
                    name,
                    items: []
                }
            }
        }
    }),
    addSplit: (sharedItem: sharedItem) => set( (state) => ({
        split: [...state.split, sharedItem],
    })),
}))