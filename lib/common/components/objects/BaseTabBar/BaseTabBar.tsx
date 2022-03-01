import { useMemo, useRef, useEffect, useCallback, useState } from "react";
import { useTheme } from "styled-components";

import { useMeasure } from "@/common/hooks/ui/useMeasure";

import { AnimatedBox, Grid, GridProps, Box } from "../../atoms";

export interface BaseTabBarProps extends GridProps {
  tabs: {
    [key: string]: JSX.Element | undefined;
  };
  activeTab?: string;
}

type SliderPosProps = {
  left?: number;
  right?: number;
};

export function BaseTabBar({
  tabs,
  activeTab,
  ...rest
}: BaseTabBarProps): JSX.Element {
  const { space, colors } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLDivElement | null>>(new Map());
  const { bounds, ref } = useMeasure();
  const [sliderPos, setSliderPos] = useState<SliderPosProps>({});

  const handleTabClick = useCallback(
    (key: string) => {
      if (tabRefs.current) {
        const target = tabRefs.current?.get(key);
        const container = containerRef.current;
        if (target && container) {
          const cRect = container.getBoundingClientRect();

          if (cRect.width === 0) {
            return;
          }

          const tRect = target.getBoundingClientRect();
          const left = tRect.left - cRect.left;
          const right = cRect.right - tRect.right;

          setSliderPos({
            left,
            right,
          });
        }
      }
    },
    [tabRefs, bounds]
  );

  useEffect(() => {
    if (activeTab) {
      handleTabClick(activeTab);
    }
  }, [activeTab, handleTabClick]);

  const tabComponents = useMemo(() => {
    const keys = Object.keys(tabs);

    return keys.map((key) => {
      const color = activeTab === key ? colors.white[0] : colors.slate;
      return (
        <Box
          cursor="pointer"
          key={key}
          ref={(el) => tabRefs.current?.set(key, el)}
          onClick={() => handleTabClick(key)}
          color={color}
        >
          {tabs[key]}
        </Box>
      );
    });
  }, [tabs, tabRefs, handleTabClick]);

  return (
    <Box ref={ref}>
      <Grid
        position="relative"
        gridAutoFlow="column"
        gridAutoColumns="max-content"
        gridGap={space.xxs}
        ref={containerRef}
        py={12}
        px={space.xxs}
        {...rest}
      >
        {tabComponents}
        <AnimatedBox
          bottom={0}
          position="absolute"
          bg={colors.accent}
          h={4}
          initial={false}
          transition={{ type: "linear" }}
          animate={sliderPos}
        />
      </Grid>
    </Box>
  );
}
