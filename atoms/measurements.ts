import { atom } from "jotai";
import { Measurements } from "../types/measurements";

export const measurementsAtom = atom<Measurements>({
  bust: "36",
  waist: "32",
  shoulder: "14.5",
  blouseLength: "14.5",
  armhole: "17",
  sleeveLength: "10",
  neckFront: "8.5",
  neckBack: "10",
  height: "64",
});
