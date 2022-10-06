import { useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

import useCallbackRef from "./useCallbackRef";

interface Bounds {
  height?: number;
  width?: number;
}

export function useMeasure(): { bounds: Bounds; ref: (node: unknown) => void } {
  const [element, attachRef] = useCallbackRef();
  const [bounds, setBounds] = useState<Bounds>({});

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setBounds({
        height: entry.contentRect.height,
        width: entry.contentRect.width,
      });
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, [element]);

  return {
    bounds,
    ref: attachRef,
  };
}
