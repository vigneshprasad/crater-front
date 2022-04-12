import { useState } from "react";
import { useTheme } from "styled-components";

import { AnimatedBox, Icon, Text } from "@/common/components/atoms";

interface IProps {
  heading: string;
  subText: string;
}

export default function FaqExpander({ heading, subText }: IProps): JSX.Element {
  const [state, setState] = useState<"expanded" | "collapsed">("collapsed");
  const { space, colors, radii } = useTheme();

  const toggleState = (): void => {
    setState((curr) => {
      if (curr === "collapsed") {
        return "expanded";
      }

      return "collapsed";
    });
  };

  return (
    <AnimatedBox
      animate={state}
      cursor="pointer"
      bg={colors.white[0]}
      p={space.xxs}
      borderRadius={radii.xxs}
      onClick={toggleState}
    >
      <AnimatedBox
        display="grid"
        gridTemplateColumns="1fr max-content"
        alignItems="center"
      >
        <Text textStyle="title" color={colors.black[0]}>
          {heading}
        </Text>
        <AnimatedBox
          variants={{
            expanded: {
              transform: "rotate(180deg)",
            },
            collapsed: {
              transform: "rotate(0deg)",
            },
          }}
        >
          <Icon color={colors.black[0]} icon="ChevronDown" />
        </AnimatedBox>
      </AnimatedBox>

      <AnimatedBox
        variants={{
          expanded: {
            display: "block",
            height: "auto",
            opacity: 1,
            marginTop: "18px",
          },
          collapsed: {
            height: "0px",
            opacity: 0,
            marginTop: "0px",
            transitionEnd: {
              display: "none",
            },
          },
        }}
      >
        <Text color={colors.black[0]}>{subText}</Text>
      </AnimatedBox>
    </AnimatedBox>
  );
}
