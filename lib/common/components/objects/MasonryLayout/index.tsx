import Masonry from "masonry-layout";
import { useEffect, useRef } from "react";
import { mergeRefs } from "react-merge-refs";

import { useMeasure } from "@/common/hooks/ui/useMeasure";

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
  const { ref, bounds } = useMeasure();

  useEffect(() => {
    if (containerRef.current) {
      new Masonry(containerRef.current, {
        itemSelector,
        gutter: 20,
        resize: true,
      });
    }
  }, [containerRef, itemSelector, bounds]);
  return (
    <Box
      w="100%"
      h="100%"
      ref={mergeRefs([containerRef, ref])}
      className="masonry-root"
    >
      {children}
    </Box>
  );
}
