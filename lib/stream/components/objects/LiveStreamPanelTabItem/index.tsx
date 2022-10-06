import { useTheme } from "styled-components";

import { Grid, Icon, Text } from "@/common/components/atoms";
import { IconOptions } from "@/common/theme";

interface IProps {
  label: string | JSX.Element;
  icon: IconOptions;
}

export default function LiveStreamPanelTabItem({
  label,
  icon,
}: IProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Grid
      gridTemplateColumns="max-content max-content"
      gridGap={space.xxxxs}
      alignItems="center"
      px={2}
      justifyContent="center"
    >
      <Icon color="inherit" size={16} icon={icon} />
      <Text as="div" color="inherit" textStyle="tabLabel">
        {label}
      </Text>
    </Grid>
  );
}
