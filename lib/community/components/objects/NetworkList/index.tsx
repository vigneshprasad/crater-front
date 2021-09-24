import { Profile } from "next-auth";
import { useTheme } from "styled-components";

import { Avatar, Box, Grid, Text } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import { Webinar } from "@/community/types/community";

export interface IProps {
  webinar: Webinar;
  members?: Profile[];
  loading: boolean;
}

export default function NetworkList({
  webinar,
  members,
  loading,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  return (
    <>
      <Text px={space.xxs} textStyle="headline6">
        {`Following ${webinar.host_detail?.name}`}
      </Text>
      <Grid
        gridAutoFlow="row"
        gridGap={space.xs}
        gridAutoRows="min-content"
        bg={colors.black[4]}
        my={space.xs}
        p={space.xs}
        borderRadius={radii.xxs}
        maxHeight={420}
        h="100%"
      >
        {(() => {
          if (loading) {
            return (
              <Box m="auto auto">
                <Spinner />
              </Box>
            );
          }

          if (!members || !members.length) {
            return <Text m="auto auto">No Meetings as of now</Text>;
          }

          return members.map((member) => (
            <Grid
              gridTemplateColumns="min-content 1fr"
              alignItems="center"
              gridGap={space.xxs}
              key={member.pk}
            >
              <Avatar size={64} image={member.photo} />
              <Box>
                <Text py={4} textStyle="title">
                  {member.name}
                </Text>
                <Text textStyle="caption">{member.tag_list?.[0]?.name}</Text>
              </Box>
            </Grid>
          ));
        })()}
      </Grid>
    </>
  );
}
