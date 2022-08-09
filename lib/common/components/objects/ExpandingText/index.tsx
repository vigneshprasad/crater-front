import { motion, MotionProps } from "framer-motion";
import { SyntheticEvent, useState } from "react";
import styled, { useTheme } from "styled-components";

import { AnimatedBox, Text, TextProps } from "../../atoms";

type IProps = TextProps &
  MotionProps & {
    maxLines?: number;
    showMore?: boolean;
  };

const AnimatedText = styled(motion(Text))<IProps>``;

export default function ExpandingText({
  maxLines = 2,
  showMore = true,
  ...rest
}: IProps): JSX.Element {
  const [expanded, setExpanded] = useState(false);
  const { colors } = useTheme();

  const onClickButton = (event: SyntheticEvent): void => {
    event.stopPropagation();
    setExpanded((state) => !state);
  };

  return (
    <AnimatedBox layout transition={{ duration: 0.1 }}>
      <AnimatedText maxLines={expanded ? undefined : maxLines} {...rest} />
      {showMore && (
        <Text
          cursor="pointer"
          onClick={onClickButton}
          color={colors.accentLight}
          textStyle="caption"
        >
          {expanded ? "View Less" : "View More"}
        </Text>
      )}
    </AnimatedBox>
  );
}
