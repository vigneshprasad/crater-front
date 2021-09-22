import { AnimateSharedLayout, motion, MotionProps } from "framer-motion";
import { useState } from "react";
import styled, { useTheme } from "styled-components";

import { AnimatedBox, Text, TextProps } from "../../atoms";

type IProps = TextProps &
  MotionProps & {
    maxLines?: number;
  };

const AnimatedText = styled(motion(Text))<IProps>``;

export default function ExpandingText({
  maxLines = 2,
  ...rest
}: IProps): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useTheme();

  const onClickButton = (): void => {
    setExpanded((state) => !state);
  };

  return (
    <AnimateSharedLayout type="crossfade">
      <AnimatedBox layout transition={{ duration: 0.1 }}>
        <AnimatedText maxLines={expanded ? undefined : maxLines} {...rest} />
        <Text
          cursor="pointer"
          onClick={onClickButton}
          color={colors.accent}
          textStyle="caption"
        >
          {expanded ? "View Less" : "View More"}
        </Text>
      </AnimatedBox>
    </AnimateSharedLayout>
  );
}
