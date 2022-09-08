import Masonry from "masonry-layout";
import { useEffect, useRef } from "react";

import { Box } from "../../atoms";

interface IProps {
  itemSelector: string;
  children?: React.ReactNode | undefined;
}

export default function MasonryLayout({
  itemSelector,
  children,
}: IProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      new Masonry(containerRef.current, {
        itemSelector,
        gutter: 24,
      });
    }
  }, [containerRef, itemSelector]);
  return (
    <Box w="100%" h="100%" ref={containerRef} className="masonry-root">
      {children}
    </Box>
  );
}
