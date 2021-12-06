import { useState, useCallback } from "react";

type HookResponse = [HTMLElement | null, (node: unknown) => void];

export default function useCallbackRef(): HookResponse {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const fn = useCallback((node) => {
    setRef(node);
  }, []);

  return [ref, fn];
}
