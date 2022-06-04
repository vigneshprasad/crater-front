import { useState } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import useAuth from "@/auth/context/AuthContext";
import {
  AnimatedBox,
  AnimatedBoxProps,
  Box,
  Text,
  Grid,
  Icon,
  Spinner,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { Webinar } from "@/community/types/community";

interface IProps extends AnimatedBoxProps {
  stream: Webinar;
  onClickCard: (stream: Webinar) => Promise<void>;
}

const Overlay = styled(Grid)`
  transition: all 0.2s ease-in;
`;

const Container = styled(Box)`
  &:hover > ${Overlay} {
    display: grid;
    opacity: 1;
    background: rgba(145, 70, 255, 0.4);
  }
`;

export default function AnimatedCard({
  stream,
  onClickCard,
  ...rest
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  const [loadingRequest, setLoadingRequest] = useState(false);
  const { user } = useAuth();

  const handleClick = async (): Promise<void> => {
    setLoadingRequest(true);
    onClickCard && (await onClickCard(stream));

    setLoadingRequest(false);
  };

  return (
    <AnimatedBox
      display="flex"
      gridGap={space.xxxs}
      flexDirection="column"
      {...rest}
    >
      <Container position="relative" pt="56.25%" w="100%">
        <Image
          alt={stream.topic_detail.name}
          src={stream.topic_detail.image}
          layout="fill"
        />
        <Overlay
          display="none"
          opacity={0}
          position="absolute"
          top={0}
          right={0}
          left={0}
          bottom={0}
          bg="transparent"
        >
          {user?.pk !== stream.host && stream.has_rsvp ? (
            <Button
              m="auto auto"
              disabled
              label="RSVP"
              suffixElement={
                <Icon
                  size={20}
                  icon="CheckCircle"
                  color={colors.greenSuccess}
                />
              }
            />
          ) : (
            <Button
              disabled={loadingRequest}
              m="auto auto"
              label="RSVP"
              onClick={() => {
                handleClick();
              }}
              suffixElement={loadingRequest ? <Spinner size={28} /> : undefined}
            />
          )}
        </Overlay>
      </Container>
      <Text maxLines={2} textStyle="body">
        {stream.topic_detail.name}
      </Text>
    </AnimatedBox>
  );
}
