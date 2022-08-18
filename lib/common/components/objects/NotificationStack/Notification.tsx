import { useAnimation } from "framer-motion";
import { useCallback, useEffect } from "react";
import { useTheme } from "styled-components";

import { Grid, AnimatedBox, Icon, Text, AnimatedBoxProps } from "../../atoms";

type IProps = AnimatedBoxProps & {
  index: number;
  content: string | JSX.Element;
};

export function Notification({
  content,
  index,
  ...props
}: IProps): JSX.Element {
  const { colors, space, radii } = useTheme();
  const progressAnim = useAnimation();
  const cardAnim = useAnimation();

  const hideCard = useCallback(async () => {
    await cardAnim.start("hidden");
  }, [cardAnim]);

  useEffect(() => {
    const showCard = async (): Promise<void> => {
      await cardAnim.start("visible");

      await progressAnim.start({
        width: "100%",
        transition: {
          duration: 2,
          delay: index * 1,
        },
      });

      await cardAnim.start("hidden");
    };

    showCard();
  }, [progressAnim, index, cardAnim]);

  return (
    <AnimatedBox
      position="relative"
      initial="hidden"
      animate={cardAnim}
      variants={{
        hidden: {
          y: -50,
          opacity: 0,
          transitionEnd: {
            display: "none",
          },
        },
        visible: {
          y: 0,
          display: "block",
          opacity: 1,
          transition: {
            delay: index * 1,
          },
        },
      }}
      bg={colors.primaryDark}
      overflow="hidden"
      border={`1px solid ${colors.secondaryLight}`}
      borderRadius={radii.xxxxs}
      {...props}
    >
      <Grid gridTemplateColumns="max-content 1fr">
        <Grid
          minHeight={48}
          h="100%"
          borderRight={`1px solid ${colors.secondaryLight}`}
          w={48}
        >
          <Icon m="14px auto" icon="Info" fill color={colors.accentLight} />
        </Grid>
        <Grid px={space.xxxs} py={space.xxxxs} maxWidth={280}>
          <Text textStyle="notificationContent" m="auto 0">
            {content}
          </Text>
        </Grid>
      </Grid>
      <AnimatedBox
        animate={progressAnim}
        initial={{
          width: "0%",
        }}
        h={4}
        bg={colors.accentLight}
      />
      <Icon
        position="absolute"
        cursor="pointer"
        icon="Close"
        top={4}
        right={4}
        size={16}
        onClick={() => hideCard()}
      />
    </AnimatedBox>
  );
}
