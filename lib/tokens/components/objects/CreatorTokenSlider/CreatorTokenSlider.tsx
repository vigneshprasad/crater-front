import { useTheme } from "styled-components";

import {
  AnimatedBox,
  AnimatedBoxProps,
  Box,
  Link,
} from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import { Creator } from "@/creators/types/creator";

import { CreatorCard } from "./CreatorCard";

export interface CreatorTokenSliderProps extends AnimatedBoxProps {
  creators?: Creator[];
  loading: boolean;
  activeCreator?: Creator;
}

export function CreatorTokenSlider({
  creators,
  loading,
  activeCreator,
  ...rest
}: CreatorTokenSliderProps): JSX.Element {
  const { space } = useTheme();

  if (!creators || loading) {
    return <Box>Loading</Box>;
  }

  return (
    <AnimatedBox
      display="grid"
      gridAutoFlow="column"
      gridAutoColumns={174}
      gridGap={space.xs}
      overflowX="auto"
      {...rest}
    >
      {creators.map((creator) => (
        <Link href={PageRoutes.tokens(creator.slug)} key={creator.id}>
          <CreatorCard
            animate={creator.id === activeCreator?.id ? "selected" : "enter"}
            creator={creator}
          />
        </Link>
      ))}
    </AnimatedBox>
  );
}
