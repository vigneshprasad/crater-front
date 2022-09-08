import { forwardRef, useState, useMemo } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import useAuth from "@/auth/context/AuthContext";
import {
  AnimatedBox,
  Text,
  Box,
  Link,
  Flex,
  Avatar,
  Icon,
  Spinner,
  Grid,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";

export enum CardPosition {
  right,
  left,
  center,
}

interface IProps {
  stream: Webinar;
  link?: string;
  onClickRsvp?: (stream: Webinar) => Promise<void>;
  cardPosition?: CardPosition;
}

const StreamCard = forwardRef<HTMLDivElement, IProps>(
  ({ stream, link, onClickRsvp, cardPosition }, ref) => {
    const { space, radii, colors, breakpoints } = useTheme();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const startTime = DateTime.parse(stream.start).toFormat(
      DateTime.DEFAULT_FORMAT
    );

    const { matches: isMobile } = useMediaQuery(
      `(max-width: ${breakpoints[0]})`
    );

    const image = (
      <Box
        w="100%"
        position="relative"
        pt="56.25%"
        borderRadius={radii.xxxxs}
        overflow="hidden"
      >
        <Image
          src={stream.topic_detail.image}
          layout="fill"
          alt={stream.topic_detail.name}
        />
        {stream.has_rsvp && (
          <Flex
            border={`1px solid ${colors.accentLight}`}
            bg={colors.primaryBackground}
            position="absolute"
            top={8}
            right={8}
            borderRadius={28}
            gridGap={space.xxxxxs}
            alignItems="center"
            py={4}
            pl={8}
            pr={4}
          >
            <Text textStyle="caption">Attending</Text>
            <Icon size={18} icon="CheckCircle" color={colors.greenSuccess} />
          </Flex>
        )}
      </Box>
    );

    const streamDetails = (
      <>
        <Flex
          pt={space.xxxxs}
          pb={space.xxxxxs}
          gridGap={space.xxxxs}
          alignItems="center"
        >
          <Avatar size={28} image={stream.host_detail.photo} />
          <Text textStyle="body">{stream.host_detail.name}</Text>
        </Flex>
        <Text pb={space.xxxxs} textStyle="title" minHeight={52}>
          {stream.topic_detail.name}
        </Text>
        <Flex opacity={0.8} alignItems="center" gridGap={space.xxxxs}>
          <Icon icon="Calendar" size={16} color={colors.textSecondary} />
          <Text color={colors.textSecondary} textStyle="caption">
            {startTime}
          </Text>
        </Flex>
      </>
    );

    const hoverCardAnim = useMemo(() => {
      const base = {
        initial: {
          opacity: 0,
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          transitionEnd: {
            display: "none",
          },
        },
        hovered: {
          display: "block",
          opacity: 1,
          boxShadow: "0px 0px 16px 0px #000000",
        },
      };
      switch (cardPosition) {
        case CardPosition.center:
          return {
            ...base,
            hovered: {
              ...base.hovered,
              top: -36,
              bottom: -36,
              right: -36,
              left: -36,
            },
          };
        case CardPosition.right:
          return {
            ...base,
            hovered: {
              ...base.hovered,
              top: -36,
              bottom: -36,
              right: 0,
              left: -72,
            },
          };
        case CardPosition.left:
          return {
            ...base,
            hovered: {
              ...base.hovered,
              top: -36,
              bottom: -36,
              right: -72,
              left: 0,
            },
          };
      }
    }, [cardPosition]);

    if (isMobile === undefined) return null;

    if (isMobile) {
      return (
        <Link
          href={link ?? PageRoutes.session(stream.id)}
          boxProps={{ target: "_blank" }}
        >
          <Grid
            gridGap={space.xxxxs}
            gridTemplateColumns="1fr 2fr"
            borderBottom="1px solid #333333"
          >
            <Box
              position="relative"
              pt="56.25%"
              borderRadius={radii.xxxxs}
              overflow="hidden"
            >
              <Image
                src={stream.topic_detail.image}
                layout="fill"
                alt={stream.topic_detail.name}
              />
            </Box>
            <Box>
              <Text maxLines={2}>{stream.topic_detail.name}</Text>
              <Flex alignItems="center" gridGap={space.xxxxs}>
                <Avatar size={16} image={stream.host_detail.photo} />
                <Text fontSize="1rem">{stream.host_detail.name}</Text>
              </Flex>
            </Box>

            <Flex
              pb={space.xxxxxs}
              gridColumn="1 / span 2"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex alignItems="center" gridGap={space.xxxxs}>
                <Icon color={colors.textSecondary} size={16} icon="Calendar" />
                <Text textStyle="caption" color={colors.textSecondary}>
                  {startTime}
                </Text>
              </Flex>

              {(() => {
                if (stream.has_rsvp === undefined || stream.has_rsvp === null)
                  return <Box />;
                if (stream.has_rsvp) {
                  return (
                    <Flex py={space.xxxxs} alignItems="center" gridGap={5}>
                      <Text
                        textStyle="body"
                        fontWeight={600}
                        color={colors.accentLight}
                        textTransform="uppercase"
                        opacity={0.8}
                      >
                        Attending
                      </Text>
                      <Icon
                        icon="CheckCircle"
                        size={16}
                        color={colors.green[0]}
                      />
                    </Flex>
                  );
                }

                if (loading) {
                  return (
                    <Flex py={5} alignItems="center" gridGap={space.xxxxs}>
                      <Text
                        textStyle="body"
                        fontWeight={600}
                        color={colors.accentLight}
                        textTransform="uppercase"
                        opacity={0.8}
                      >
                        Remind Me
                      </Text>
                      <Spinner size={16} />
                    </Flex>
                  );
                }

                if (user?.pk === stream.host_detail.pk) {
                  return null;
                }

                return (
                  <Flex alignItems="center" gridGap={5}>
                    <Text
                      textStyle="body"
                      fontWeight={600}
                      cursor="pointer"
                      color={colors.accentLight}
                      textTransform="uppercase"
                      onClick={async (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setLoading(true);
                        onClickRsvp && (await onClickRsvp(stream));
                        setLoading(false);
                      }}
                    >
                      Remind Me
                    </Text>
                    <Icon
                      icon="IcNotficationFill"
                      size={20}
                      color={colors.accentLight}
                    />
                  </Flex>
                );
              })()}
            </Flex>
          </Grid>
        </Link>
      );
    }

    return (
      <AnimatedBox
        cursor="pointer"
        ref={ref}
        initial="initial"
        position="relative"
        whileHover="hovered"
        variants={{
          initial: {
            zIndex: 1,
          },
          hovered: {
            zIndex: 25,
          },
        }}
      >
        <AnimatedBox
          variants={{
            initial: {
              display: "block",
              opacity: 1,
              visibility: "visible",
            },
            hovered: {
              opacity: 0,
              transitionEnd: {
                visibility: "hidden",
              },
            },
          }}
        >
          {image}
          {streamDetails}
        </AnimatedBox>

        <AnimatedBox
          position="absolute"
          borderRadius={radii.xxxxs}
          variants={hoverCardAnim}
        >
          <Link
            href={link ?? PageRoutes.session(stream.id)}
            boxProps={{ target: "_blank" }}
          >
            {image}
            <Box bg={colors.primaryDark} p={space.xxxs}>
              {streamDetails}

              <Button
                variant="secondary-dark-flat"
                my={space.xxxxs}
                display="block"
                w="100%"
                label="GO TO STREAM PAGE"
              />

              {(() => {
                if (!user) {
                  return null;
                }

                if (user.pk === stream.host_detail.pk) {
                  return null;
                }

                if (stream.has_rsvp) {
                  return null;
                }

                return (
                  <Button
                    disabled={loading || stream.has_rsvp}
                    onClick={async (event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setLoading(true);
                      onClickRsvp && (await onClickRsvp(stream));
                      setLoading(false);
                    }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    w="100%"
                    label="Remind Me"
                    suffixElement={
                      loading ? (
                        <Spinner size={20} />
                      ) : (
                        <Icon
                          icon="IcNotficationFill"
                          color={colors.white[0]}
                        />
                      )
                    }
                  />
                );
              })()}
            </Box>
          </Link>
        </AnimatedBox>
      </AnimatedBox>
    );
  }
);

StreamCard.displayName = "StreamCard";

StreamCard.defaultProps = {
  link: undefined,
  onClickRsvp: undefined,
  cardPosition: CardPosition.center,
};

export default StreamCard;
