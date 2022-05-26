import { Dispatch, SetStateAction } from "react";
import { useTheme } from "styled-components";

import { Grid, Shimmer } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { StreamCategory } from "@/creators/types/stream";

interface IProps {
  categories?: StreamCategory[];
  selectedCategory?: number;
  setCategory?: Dispatch<SetStateAction<number | undefined>>;
}

export default function CategoriesList({
  categories,
  selectedCategory,
  setCategory,
}: IProps): JSX.Element {
  const { space } = useTheme();

  return (
    <Grid
      gridAutoFlow="column"
      gridAutoColumns="max-content"
      gridGap={space.xxs}
      overflowX="auto"
    >
      {(() => {
        if (!categories) {
          return Array(5)
            .fill("")
            .map((_, index) => (
              <Shimmer w={108} h={42} borderRadius={36} key={index} />
            ));
        }

        return categories.map((category) => {
          if (category.pk === selectedCategory) {
            return (
              <Button
                key={category.pk}
                variant="filter-selected"
                label={category.name}
                onClick={() => setCategory && setCategory(undefined)}
              />
            );
          }

          return (
            <Button
              key={category.pk}
              variant="round"
              label={category.name}
              onClick={() => setCategory && setCategory(category.pk)}
            />
          );
        });
      })()}
    </Grid>
  );
}
