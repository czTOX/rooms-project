import { atom } from "recoil";

export const logedInAtom = atom<boolean>({
    key: 'logedIn',
    default: true,
});