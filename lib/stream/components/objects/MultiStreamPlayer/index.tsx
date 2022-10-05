import { Variants } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "styled-components";

import { Box, Grid, GridProps } from "@/common/components/atoms";
import { MultiStream } from "@/community/types/community";

import StreamHLSPlayer from "../StreamHLSPlayer";

interface IProps {
  multistream: MultiStream;
  active: number;
  onClickStream: (id: number) => void;
}

export default function MultiStreamPlayer({
  active,
  multistream,
  onClickStream,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const { streams } = multistream;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [variants, setVariants] = useState<Variants | undefined>(undefined);
  const [height, setHeight] = useState<string | number>("auto");
  const [width, setWidth] = useState<string | number>("auto");

  const containerProps = useMemo<GridProps>(() => {
    const size = streams.length;

    if (size < 3) {
      return {
        gridAutoFlow: "row",
        gridAutoColumns: "min-content",
        justifyContent: "center",
        alignItems: "center",
      };
    } else {
      return {
        gridTemplateColumns: `repeat(${size - 1}, 1fr)`,
        justifyContent: "center",
        alignItems: "center",
      };
    }
  }, [streams]);

  const layoutTemplate = useMemo(() => {
    const size = streams.length;
    const remainingStreams = streams.filter((val) => val !== active);
    if (size < 3) {
      return `
        "stream_${active}"
        ${streams
          .filter((id) => id !== active)
          .map((item) => `"stream_${item}"`)
          .join("")}
      `;
    } else {
      return `
        "${Array(size - 1)
          .fill("")
          .map(() => `stream_${active} `)
          .join("")}"
        "${remainingStreams.map((item) => `stream_${item} `).join("")}"
      `;
    }
  }, [active, streams]);

  const getVariant = useCallback(
    (id: number) => {
      const size = streams.length;
      if (size < 3) {
        if (id === active) return "large_primary";
        return "large_secondary";
      }

      if (id === active) return "small_primary";
      return "small_secondary";
    },
    [active, streams]
  );

  useEffect(() => {
    if (containerRef.current) {
      const { width } = containerRef.current.getBoundingClientRect();

      const largePrimaryWidth = 0.5 * width;
      const largePrimaryHeight = (largePrimaryWidth * 9) / 16;
      const largeSecondaryWidth = 0.3 * width;
      const largeSecondaryHeight = (largeSecondaryWidth * 9) / 16;

      const smallPrimaryWidth = 0.6 * width;
      const smallPrimaryHeight = (smallPrimaryWidth * 9) / 16;
      const smallSecondaryWidth = 0.3 * width;
      const smallSecondaryHeight = (smallSecondaryWidth * 9) / 16;
      setWidth(width - 120);
      setVariants({
        large_primary: {
          width: largePrimaryWidth,
          height: largePrimaryHeight,
          opacity: 1,
          transitionEnd: {
            display: "grid",
          },
        },
        large_secondary: {
          width: largeSecondaryWidth,
          height: largeSecondaryHeight,
          opacity: 1,
          transitionEnd: {
            display: "grid",
          },
        },
        small_primary: {
          width: smallPrimaryWidth,
          height: smallPrimaryHeight,
          opacity: 1,
          transitionEnd: {
            display: "grid",
          },
        },
        small_secondary: {
          width: smallSecondaryWidth,
          height: smallSecondaryHeight,
          opacity: 1,
          transitionEnd: {
            display: "grid",
          },
        },
      });
      const height = smallPrimaryHeight + smallSecondaryHeight + 48;
      setHeight(height);
    }
  }, [containerRef, setVariants, setHeight, setWidth]);

  return (
    <Box px={space.xxxxs} w="100%">
      <Box ref={containerRef} borderBottom={`1px solid ${colors.primaryLight}`}>
        <Grid
          m="0 auto"
          w={width}
          h={height}
          gridGap={8}
          py={space.xxxxs}
          justifyContent="center"
          alignItems="center"
          {...containerProps}
          gridTemplateAreas={layoutTemplate}
        >
          {streams.map((id) => (
            <StreamHLSPlayer
              autoPlay
              streamId={id}
              containerProps={{
                initial: {
                  display: "none",
                  opacity: 0,
                },
                animate: getVariant(id),
                m: "auto auto",
                variants: variants,
                gridArea: `stream_${id}`,
                layout: true,
              }}
              onClick={() => {
                onClickStream && onClickStream(id);
              }}
              key={id}
              controls={id === active}
              muted={id !== active}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
