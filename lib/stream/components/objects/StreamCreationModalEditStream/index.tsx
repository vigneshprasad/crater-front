import { useCallback } from "react";
import { useTheme } from "styled-components";

import {
  Avatar,
  Box,
  Grid,
  Icon,
  Text,
  Flex,
  IconButton,
} from "@/common/components/atoms";
import { Creator } from "@/creators/types/creator";

interface IProps {
  creator?: Creator;
}

export default function StreamCreationModalEditStream({
  creator,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  const performCopyClipboard = useCallback(async () => {
    const email = creator?.point_of_contact_detail.email;

    if (email) {
      await navigator.clipboard.writeText(email);
    }
  }, [creator]);

  return (
    <>
      <Text textStyle="headline6" color="#D5BBFF" pb={space.xxs}>
        Edit stream details
      </Text>

      <Box gridColumn="1 / span 2">
        <Text pb={space.xs} w={320} lineHeight="180%" maxLines={2}>
          You can edit the stream details by contacting us. Here are the details
          of your POC at Crater.
        </Text>

        {creator?.point_of_contact_detail && (
          <Grid
            gridTemplateColumns="1fr 1fr 1fr max-content"
            alignItems="center"
            px={space.xxs}
            py={space.xxs}
            bg={colors.black[0]}
            borderRadius={radii.xxxs}
          >
            <Flex alignItems="center" gridGap={space.xxxxs}>
              <Avatar
                size={24}
                image={creator?.point_of_contact_detail?.photo}
              />
              <Text textStyle="label">
                {creator?.point_of_contact_detail?.name}
              </Text>
            </Flex>

            <Flex
              alignItems="center"
              gridGap={space.xxxxs}
              justifySelf="center"
            >
              <Icon icon="Phone" size={12} fill />
              <Text textStyle="label">
                {creator?.point_of_contact_detail?.phone_number}
              </Text>
            </Flex>

            <Flex
              alignItems="center"
              gridGap={space.xxxxs}
              justifySelf="center"
            >
              <Icon icon="Email" size={12} fill />
              <Text textStyle="label" justifySelf="center">
                {creator?.point_of_contact_detail?.email}
              </Text>
            </Flex>

            <IconButton
              variant="flatNoBg"
              iconProps={{ fill: true }}
              icon="ContentCopy"
              onClick={performCopyClipboard}
            />
          </Grid>
        )}
      </Box>
    </>
  );
}
