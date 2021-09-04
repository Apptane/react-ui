import { createContext } from "react";

export type FormContext = {
  spacing?: number;
  disabled?: boolean;
};

export const FormContext = createContext<FormContext>({});
