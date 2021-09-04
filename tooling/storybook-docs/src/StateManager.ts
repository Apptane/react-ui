import { useState } from "react";

export type StateRenderProps<T> = {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
  bind: (name: keyof T) => {
    value?: T[keyof T];
    onChange: (value: T[keyof T]) => boolean;
  };
};

export type StateManagerProps<T> = {
  children: (props: StateRenderProps<T>) => React.ReactElement;
  initialValue: T;
};

export function StateManager<T>({ children, initialValue }: StateManagerProps<T>) {
  const [state, setState] = useState<T>(initialValue);
  const bind = (name: keyof T) => ({
    value: state ? state[name] : undefined,
    onChange: (value: T[keyof T]) => {
      setState((prevState) => ({ ...prevState, [name]: value }));
      return true;
    },
  });

  return children({
    setState,
    state,
    bind,
  });
}
