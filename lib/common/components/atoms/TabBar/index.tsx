import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "styled-components";

import { AnimatedBox } from "../Animated";
import { Link } from "../Link";
import { Box, Grid, Text, GridProps } from "../System";

type IProps = {
  tabs: string[];
  selected?: string;
  onChangeTab?: (tab: string) => void;
  tabBarProps?: GridProps;
  baseUrl: string;
};

type SliderPosProps = {
  left?: number;
  right?: number;
};

export default function TabBar({
  tabs,
  selected,
  onChangeTab,
  tabBarProps,
  baseUrl,
}: IProps): JSX.Element {
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
      py={[space.xxs, space.xs]}
      px={[space.xxs, space.s]}
      gridAutoFlow="column"
      gridAutoColumns="min-content"
      gridGap={[4, space.xs]}
      overflowX="auto"
      {...tabBarProps}
    >
      {tabs.map((tab) => (
        <Link href={`${baseUrl}/${tab}`} key={tab} shallow>
          <Box
            onClick={() => {
              setSelectedTab(tab);
              tabChangeCallback(tab);
            }}
            px={[space.xxs, space.xs]}
            pb={[4, space.xxxs]}
            ref={(el) => tabRefs.current?.set(tab, el)}
          >
            <Text textTransform="capitalize" textStyle="title">
              {tab}
            </Text>
          </Box>
        </Link>
      ))}
      <AnimatedBox
        initial={false}
        bottom={0}
        position="absolute"
        bg={colors.accent}
        h={4}
        animate={sliderPos}
      />
    </Grid>
  );
}
