import { createContext } from "react";
import { ChartSlice } from "./ChartSlice";

export const ChartSliceContext = createContext<ChartSlice | undefined>(undefined);
