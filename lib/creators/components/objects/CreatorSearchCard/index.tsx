import styled, { useTheme } from "styled-components";

import { Avatar, Box, Flex, Link, Text } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import { CreatorListItem } from "@/creators/types/creator";

type IProps = {
  creator: CreatorListItem;
};

const StyledBox = styled(Box)`
  backdrop-filter: blur(24px);
`;

export default function CreatorSearchCard({ creator }: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  return (
    <Flex w={120} flexDirection="column" gridGap={space.xxxxxs}>
      <Link href={PageRoutes.creatorProfile(creator.slug)}>
        <StyledBox
          p={space.xxs}
          bg={colors.primaryLight}
          borderRadius={radii.xxxxs}
        >
          <Avatar size={88} image={creator.profile_detail.photo} />
        </StyledBox>
      </Link>
      <Box>
        <Text textStyle="caption" fontWeight={600}>
          {creator.profile_detail.name}
        </Text>
        <Text textStyle="caption" color={colors.textQuartenary}>
          12 streams
        </Text>
      </Box>
    </Flex>
  );
}
