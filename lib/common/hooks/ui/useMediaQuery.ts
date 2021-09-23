import { useRef, useEffect, useCallback, useState } from "react";

export default function useMediaQuery(query: string): {
  matches: boolean | undefined;
} {
  const [matches, setMatches] = useState<boolean>();
  const mq = useRef<MediaQueryList>();

  const handler = useCallback(() => {
    if (mq.current) {
      setMatches(mq.current.matches);
    }
  }, [setMatches, mq]);

  useEffect(() => {
    mq.current = window.matchMedia(query);
    setMatches(mq.current.matches);
    mq.current.addEventListener("change", handler);
    return () => {
      mq.current?.removeEventListener("change", handler);
    };
  }, [query, handler]);

  return {
    matches,
  };
}
