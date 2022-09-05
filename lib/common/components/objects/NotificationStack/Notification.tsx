import { useTheme } from "styled-components";

import { AnimatedBox, Grid, Icon, Text, IconProps } from "../../atoms";

export interface NotificationProps {
  title?: string;
  description?: string;
  iconProps?: IconProps;
  onClose?: () => void;
}

export function Notification({
  title,
  description,
  iconProps,
  onClose,
}: NotificationProps): JSX.Element {
  const { colors, radii, space } = useTheme();

  return (
    <AnimatedBox
      initial={{
        y: -50,
        opacity: 0,
        display: "none",
      }}
      animate={{
        y: 0,
        display: "block",
        opacity: 1,
      }}
      exit={{
        y: -50,
        opacity: 0,
        transitionEnd: {
          display: "none",
        },
      }}
    >
      <Grid
        gridTemplateColumns="max-content 1fr"
        maxWidth={340}
        w="100%"
        bg={colors.primaryDark}
        border={`1px solid ${colors.secondaryLight}`}
        borderRadius={radii.xxxxs}
        position="relative"
      >
        <Grid
          minHeight={48}
          h="100%"
          borderRight={`1px solid ${colors.secondaryLight}`}
          w={48}
        >
          <Icon icon="Activity" {...iconProps} m="14px auto" />
        </Grid>

        <Grid alignItems="center" pl={space.xxxxs} pr={24} py={space.xxxs}>
          {title && <Text textStyle="notificationTitle">{title}</Text>}
          {description && (
            <Text color={colors.textTertiary} textStyle="notificationDesc">
              {description}
            </Text>
          )}
        </Grid>
        <Icon
          icon="Close"
          cursor="pointer"
          size={16}
          position="absolute"
          top={8}
          right={8}
          onClick={onClose}
        />
      </Grid>
    </AnimatedBox>
  );
}
