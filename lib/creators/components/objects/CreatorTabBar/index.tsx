import { useCallback, useEffect, useRef, useState } from "react";

import { Grid, Box, Text, AnimatedBox, Link } from "@/common/components/atoms";
import { theme } from "@/common/theme";

const { space, colors } = theme;

type SliderPosProps = {
  left: number;
  right: number;
};

type IProps = {
  initial?: number;
  tabs: string[];
  onChange?: (index: number) => void;
  selected?: string;
};

const CreatorTabBar: React.FC<IProps> = ({
  initial,
  tabs,
  onChange,
  selected,
}) => {
  const childRefs = useRef(new Map());
  const tabListRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState<SliderPosProps>({
    left: 0,
    right: 0,
  });
  const [activeTab, setActiveTab] = useState(initial ?? 0);

  useEffect(() => {
    if (selected) {
      const index = tabs.indexOf(selected);
      if (index > -1) {
        setActiveTab(index);
      }
    }
  }, [selected, tabs]);

  useEffect(() => {
    const target = childRefs.current?.get(activeTab);
    const container = tabListRef.current;
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
  }, [childRefs, activeTab, tabListRef]);

  const handleTabChange = useCallback(
    (index: number) => {
      setActiveTab(index);

      if (onChange) {
        onChange(index);
      }
    },
    [onChange]
  );

  return (
    <Grid
      ref={tabListRef}
      gridGap={space.xs}
      gridAutoColumns="min-content"
      gridAutoFlow="column"
      position="relative"
      px={space.l}
      py={space.xs}
      bg={colors.black[2]}
    >
      {tabs.map((tab, index) => (
        <Link key={tab} href={`/creator/1/${tab}`} shallow>
          <Box
            px={[space.xs]}
            cursor="pointer"
            ref={(el) => childRefs.current?.set(index, el)}
            onClick={() => handleTabChange(index)}
          >
            <Text textTransform="capitalize" textStyle="title">
              {tab}
            </Text>
          </Box>
        </Link>
      ))}
      <AnimatedBox
        position="absolute"
        bottom={0}
        bg={colors.accent}
        height={4}
        initial={false}
        animate={{
          left: sliderPos.left,
          right: sliderPos.right,
        }}
      />
    </Grid>
  );
};

export default CreatorTabBar;
