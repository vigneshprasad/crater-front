import { useTheme } from "styled-components";

import { Grid, Icon, Text } from "@/common/components/atoms";
import { IconOptions } from "@/common/theme";

interface IProps {
  label: string;
  icon: IconOptions;
}

export default function LiveStreamPanelTabItem({
  label,
  icon,
}: IProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Grid
      gridTemplateColumns="max-content 1fr"
      gridGap={space.xxxxxs}
      alignItems="center"
      px={2}
    >
      <Icon size={16} icon={icon} />
      <Text textStyle="tabLabel">{label}</Text>
    </Grid>
  );
}
