import { createContext, useContext, useMemo } from "react";

type ComponentId = {
  namespace: number;
  current: number;
};

const DefaultComponentId: ComponentId = {
  namespace: Math.round(Math.random() * 1000000000),
  current: 0,
};

const ComponentIdContext = createContext(DefaultComponentId);

/**
 * Returns unique identifier for the component.
 */
export function useComponentId(prefix?: string) {
  const cx = useContext(ComponentIdContext);
  return useMemo(() => {
    const id = `${cx.namespace}-${++cx.current}`;
    return prefix ? `${prefix}-${id}` : id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefix]);
}
