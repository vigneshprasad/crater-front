import { useTheme } from "styled-components";

import { AnimatedBox, Text } from "@/common/components/atoms";
import DateTime from "@/common/utils/datetime/DateTime";
import { Auction } from "@/tokens/types/auctions";

interface IProps {
  withLabel?: boolean;
  auction: Auction;
}

export default function AuctionProgressBar({
  auction,
  withLabel = false,
}: IProps): JSX.Element {
  const { space, radii, colors } = useTheme();
  const start = DateTime.parse_with_milliseconds(auction.start);
  const end = DateTime.parse_with_milliseconds(auction.end);
  const now = DateTime.now();

  const progress = Math.round(
    (now.diff(start, "seconds").seconds / end.diff(start, "seconds").seconds) *
      100
  );

  return (
    <>
      <Text>
        {withLabel &&
          `Auctions ends ${DateTime.parse_with_milliseconds(
            auction.end
          ).toRelative()}`}
      </Text>

      <AnimatedBox
        my={space.xxs}
        w="100%"
        h={2}
        bg={colors.blackAlpha[1]}
        position="relative"
        borderRadius={radii.xs}
      >
        <AnimatedBox
          initial={{
            width: "0%",
          }}
          position="absolute"
          h={6}
          animate={{
            width: `${progress}%`,
          }}
          bg="#D9ADEE"
          transform="translate(0, -25%)"
          borderRadius={radii.xs}
        />
      </AnimatedBox>
    </>
  );
}
