import { useTheme } from "styled-components";

import { Grid } from "@/common/components/atoms";
import { Series } from "@/community/types/community";

import SeriesCard from "../SeriesCard";

interface IProps {
  seriesList?: Series[];
}

export default function SeriesList({ seriesList }: IProps): JSX.Element {
  const { space } = useTheme();

  return (
    <Grid
      px={[space.xxs, space.s]}
      gridGap={[space.xxs]}
      gridTemplateColumns={[
        "repeat(auto-fill, minmax(106px, 1fr))",
        "repeat(auto-fill, minmax(160px, 1fr))",
      ]}
    >
      {seriesList?.map((series) => (
        <SeriesCard series={series} key={series.id} />
      ))}
    </Grid>
  );
}
