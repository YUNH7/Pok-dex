import { atom } from "jotai";

export const initMeta = {
  title: "Pokédex",
  image: "/ogImage.png",
};

export const metaAtom = atom<Record<string, string>>(initMeta);
