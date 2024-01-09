import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const {persistAtom} = recoilPersist();
 

export const userState = atom({
  key: "userState",
  default: [],
  effects_UNSTABLE: [persistAtom]
})

export const graphState = atom({
  key: "graphState",
  default:{},
  effects_UNSTABLE: [persistAtom]
})