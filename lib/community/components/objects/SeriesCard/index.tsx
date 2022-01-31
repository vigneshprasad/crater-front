import { AnimateSharedLayout } from "framer-motion";
import { forwardRef } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import { AnimatedBox, Box, Grid, Link, Text } from "@/common/components/atoms";
import colors from "@/common/theme/colors";
import { Series } from "@/community/types/community";

interface IProps {
  series: Series;
}

const SeriesCard = forwardRef<HTMLDivElement, IProps>(({ series }, ref) => {
  const { space } = useTheme();
  const firstStream = series.groups_detail_list[0];

  return (
    <Link key={series.id} href={`/session/${firstStream.id}`}>
      <Grid ref={ref}>
        <AnimateSharedLayout>
          <AnimatedBox position="relative" layout h={[200, 220]}>
            <AnimatedBox
              top={0}
              right={0}
              left={0}
              bottom={0}
              position="absolute"
              bg={colors.accent}
            />
            <AnimatedBox overflow="hidden" whileHover={{ x: 8, y: -8 }} h={220}>
              {series.topic_detail?.image && (
                <Image
                  objectFit="cover"
                  layout="fill"
                  src={series.topic_detail?.image}
                  alt={series.topic_detail.name}
                />
              )}
            </AnimatedBox>
          </AnimatedBox>
        </AnimateSharedLayout>

        <Box py={space.xxs}>
          <Text>{series.host_detail.name}</Text>
        </Box>
      </Grid>
    </Link>
  );
});

SeriesCard.displayName = "SeriesCard";

export default SeriesCard;
