import { Measurements } from "@/types";
import { atom } from "jotai";

export const measurementsAtom = atom<Measurements>({
  chest: 80,
  waist: 66,
  fullLength: 33,
  shoulder: 17,
  blouseLength: 14.5,
  armhole: 17,
  sleeveLength: 23.5,
  sleeveRound: 24,
  neckFront: 8.5,
  neckBack: 10,
  height: 64,
});
