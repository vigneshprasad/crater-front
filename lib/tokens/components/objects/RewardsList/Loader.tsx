import { useTheme } from "styled-components";

import { Shimmer } from "@/common/components/atoms";
import { Grid, GridProps } from "@/common/components/atoms";

type IProps = GridProps;

export default function Loader({ ...props }: IProps): JSX.Element {
  const { radii } = useTheme();
  return (
    <Grid {...props}>
      {Array(4)
        .fill("")
        .map((_, index) => (
          <Shimmer borderRadius={radii.xxs} key={index} />
        ))}
    </Grid>
  );
}
