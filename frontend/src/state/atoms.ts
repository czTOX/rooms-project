import { atom } from "recoil";
import { FilterDates } from "../models";

export const logedInAtom = atom<boolean>({
    key: 'logedIn',
    default: false,
});

export const filterDatesAtom = atom<FilterDates>({
    key: 'filterDates',
    default: {
        startDate: null,
        endDate: null
    },
});