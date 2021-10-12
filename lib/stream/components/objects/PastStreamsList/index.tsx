import { useTheme } from "styled-components";
import useSWR from "swr";

import Image from "next/image";

import { Grid, Link, Text, Box } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import { PageRoutes } from "@/common/constants/route.constants";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Webinar } from "@/community/types/community";

export default function PastStreamsList(): JSX.Element {
  const { colors, space, radii } = useTheme();
  const { data, error } = useSWR<Webinar[]>(
    API_URL_CONSTANTS.groups.getPastWebinars
  );

  console.log(data);

  return (
    <>
      <Text px={space.xxs} mb={space.xxs} textStyle="title">
        Similar Streams
      </Text>
      <Grid
        gridAutoFlow="row"
        gridAutoRows="min-content"
        gridGap={space.xxs}
        py={space.xxs}
        px={space.xxs}
        borderRadius={radii.xxs}
        h="50vh"
        overflowY="auto"
        bg={colors.black[1]}
      >
        {(() => {
          if (!data && !error) {
            return <Spinner m="auto auto" />;
          }

          return data?.map((stream) => (
            <Link
              key={stream.id}
              href={PageRoutes.streamVideo(stream.id)}
              boxProps={{ target: "_blank" }}
            >
              <Grid gridTemplateColumns="max-content 1fr" gridGap={space.xxs}>
                <Box
                  position="relative"
                  h={72}
                  w={120}
                  borderRadius={radii.xxs}
                  overflow="hidden"
                >
                  {stream.topic_detail?.image && (
                    <Image
                      layout="fill"
                      objectFit="cover"
                      src={stream.topic_detail?.image}
                      alt={stream.topic_detail?.name}
                    />
                  )}
                </Box>

                <Text maxLines={2}>{stream.topic_detail?.name}</Text>
              </Grid>
            </Link>
          ));
        })()}
      </Grid>
    </>
  );
}
