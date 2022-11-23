import { useTheme } from "styled-components";

import { Shimmer } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import HorizontalScroll from "@/common/components/objects/HorizontalScroll";
import { StreamCategory } from "@/creators/types/stream";

interface IProps {
  categories?: StreamCategory[];
  selectedCategory?: string;
  onClickCategory?: (category: StreamCategory) => void;
}

export default function CategoriesList({
  categories,
  selectedCategory,
  onClickCategory,
}: IProps): JSX.Element {
  const { space } = useTheme();

  return (
    <HorizontalScroll
      gridAutoFlow="column"
      gridAutoColumns="max-content"
      gridGap={space.xxs}
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
          return (
            <Button
              h={40}
              key={category.pk}
              variant={
                selectedCategory === category.slug ? "filter-selected" : "round"
              }
              label={category.name}
              onClick={() => onClickCategory && onClickCategory(category)}
            />
          );
        });
      })()}
    </HorizontalScroll>
  );
}
