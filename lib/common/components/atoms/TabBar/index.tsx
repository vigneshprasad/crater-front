import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";

import { AnimatedBox } from "../Animated";
import { Box, Grid, Text } from "../System";

type IProps = {
  tabs: string[];
  selected?: string;
  onChangeTab?: (tab: string) => void;
};

type SliderPosProps = {
  left?: number;
  right?: number;
};

const TabBar: React.FC<IProps> = ({ tabs, selected, onChangeTab }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map());
  const { space, colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState(selected || tabs[0]);
  const [sliderPos, setSliderPos] = useState<SliderPosProps>({});

  const tabChangeCallback = useCallback(
    (tab: string) => {
      if (onChangeTab) {
        onChangeTab(tab);
      }
    },
    [onChangeTab]
  );

  useEffect(() => {
    if (selected && tabs.includes(selected)) {
      setSelectedTab(selected);
    }
  }, [selected, tabs, tabChangeCallback]);

  useEffect(() => {
    const target = tabRefs.current?.get(selectedTab);
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
  }, [tabRefs, selectedTab, containerRef]);

  return (
    <Grid
      bg={colors.black[3]}
      ref={containerRef}
      position="relative"
      py={[24]}
      px={[space.s]}
      gridAutoFlow="column"
      gridAutoColumns="min-content"
      gridGap={[space.xs]}
    >
      {tabs.map((tab) => (
        <Box
          onClick={() => {
            setSelectedTab(tab);
            tabChangeCallback(tab);
          }}
          key={tab}
          px={[space.xs]}
          cursor="pointer"
          ref={(el) => tabRefs.current?.set(tab, el)}
        >
          <Text textStyle="title">{tab}</Text>
        </Box>
      ))}
      <AnimatedBox
        bottom={0}
        position="absolute"
        bg={colors.accent}
        h={4}
        animate={sliderPos}
      />
    </Grid>
  );
};

export default TabBar;
