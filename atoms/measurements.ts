import { atom } from "jotai";
import { Measurements } from "../types/measurements";

export const measurementsAtom = atom<Measurements>({
  bust: "36",
  waist: "30",
  shoulder: "14",
  blouseLength: "14.5",
  armhole: "7",
  sleeveLength: "5.5",
  neckFront: "6.5",
  neckBack: "4",
  height: "64",
});
