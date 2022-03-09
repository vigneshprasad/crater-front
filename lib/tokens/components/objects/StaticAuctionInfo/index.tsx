import STATIC_IMAGES from "public/images";

import Image from "next/image";

import { Grid, Box, Text, GridProps } from "@/common/components/atoms";

export default function StaticAuctionInfo(props: GridProps): JSX.Element {
  return (
    <Grid gridTemplateColumns="repeat(2, 1fr)" {...props}>
      <Grid gridTemplateColumns="max-content 1fr" alignItems="center">
        <Box w={56} h={56} overflow="hidden" position="relative">
          <Image
            src={STATIC_IMAGES.ImagePlaceBidIcon}
            layout="fill"
            alt="place bid"
          />
        </Box>
        <Text>1. Place a bid </Text>
      </Grid>

      <Grid gridTemplateColumns="max-content 1fr" alignItems="center">
        <Box w={56} h={56} overflow="hidden" position="relative">
          <Image
            src={STATIC_IMAGES.ImageCreatorAcceptedIcon}
            layout="fill"
            alt="creator accepted"
          />
        </Box>
        <Text>2. Creator Accepts the bid</Text>
      </Grid>
      <Grid gridTemplateColumns="max-content 1fr" alignItems="center">
        <Box w={56} h={56} overflow="hidden" position="relative">
          <Image
            src={STATIC_IMAGES.ImageBidAcceptedIcon}
            layout="fill"
            alt="creator accepted"
          />
        </Box>
        <Text>3. You get access</Text>
      </Grid>
      <Grid gridTemplateColumns="max-content 1fr" alignItems="center">
        <Box w={56} h={56} overflow="hidden" position="relative">
          <Image
            src={STATIC_IMAGES.ImageBidRejectedIcon}
            layout="fill"
            alt="creator accepted"
          />
        </Box>
        <Text>4. If a bid is denied, the money is refunded </Text>
      </Grid>
    </Grid>
  );
}
