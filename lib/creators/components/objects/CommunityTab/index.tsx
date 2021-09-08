import Image from "next/image";

import { Box, Grid, Text, Flex } from "@/common/components/atoms";
import { theme } from "@/common/theme";
import { useCommunityMembers, useRooms } from "@/creators/hooks/";
import { Creator } from "@/creators/types/creator";

import Table from "../Table";

interface IProps {
  creator: Creator;
}

const { space } = theme;

const CommunityTab = ({ creator }: IProps) => {
  const { data } = useCommunityMembers({
    communityId: creator.default_community?.id,
  });

  const { rooms } = useRooms({ host: creator.user });

  if (!data || !rooms) return null;

  return (
    <Box py={[space.s]} px={[space.l]}>
      <Text textStyle="headline6">Rooms</Text>
      <Box py={[space.l]}>
        {rooms?.map((room) => (
          <Table
            roomId={room.id}
            key={room.id}
            speakers={room.speakers_detail_list}
          />
        ))}
      </Box>

      <Text textStyle="headline6">Members</Text>
      <Grid
        py={[space.s]}
        gridTemplateColumns="repeat(5, 120px)"
        gridGap={[space.xxxs]}
      >
        {data.results.map((member) => (
          <Flex key={member.user} alignItems="center" flexDirection="column">
            <Box
              position="relative"
              h={48}
              w={48}
              borderRadius="50%"
              overflow="hidden"
              mb={[space.xxs]}
            >
              {member.user_detail.photo && (
                <Image
                  objectFit="cover"
                  src={member.user_detail.photo}
                  layout="fill"
                  alt={member.user_detail.name}
                />
              )}
            </Box>
            <Text>{member.user_detail.name}</Text>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};

export default CommunityTab;
