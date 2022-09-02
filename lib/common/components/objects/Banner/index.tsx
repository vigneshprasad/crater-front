import { useState } from "react";
import { useTheme } from "styled-components";

import { Grid, Text } from "../../atoms";
import { IconButton } from "../../atoms/v2";

interface IProps {
  content: string;
  link?: string;
}

export default function Banner({ content, link }: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return <Grid gridArea="banner" />;
  }

  return (
    <Grid
      gridArea="banner"
      position="relative"
      py={space.xxxxs}
      bg={colors.primaryBanner}
    >
      {(() => {
        if (link) {
          return (
            <a href={link} target="_blank" rel="noreferrer">
              <Text
                textDecoration="underline"
                fontWeight="500"
                textStyle="small"
                textAlign="center"
              >
                {content}
              </Text>
            </a>
          );
        }

        return (
          <Text fontWeight="500" textStyle="small" textAlign="center">
            {content}
          </Text>
        );
      })()}

      <IconButton
        buttonStyle="flat-icon"
        position="absolute"
        right={16}
        top={4}
        icon="Close"
        onClick={() => setVisible(false)}
      />
    </Grid>
  );
}
