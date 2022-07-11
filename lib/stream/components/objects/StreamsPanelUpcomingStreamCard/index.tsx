import { forwardRef, useState, useMemo } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";
import { useRouter } from "next/router";

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
}

const StreamsPanelUpcomingStreamCard = forwardRef<HTMLDivElement, IProps>(
  ({ stream, link, onClickRsvp }, ref) => {
    const { space, radii, colors, breakpoints } = useTheme();
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const router = useRouter();
    const startTime = DateTime.parse(stream.start).toFormat(
      DateTime.DEFAULT_FORMAT
    );

    const { matches: isMobile } = useMediaQuery(
      `(max-width: ${breakpoints[0]})`
    );

    const image = (
      <Box
        w={185}
        h={100}
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
            top={5}
            right={5}
            borderRadius={28}
            gridGap={space.xxxxxs}
            alignItems="center"
            py={4}
            pl={8}
            pr={4}
          >
            <Text textStyle="small">Remind Me</Text>
            <Icon size={14} icon="CheckCircle" color={colors.greenSuccess} />
          </Flex>
        )}
      </Box>
    );

    const streamDetails = (
      <>
        <Flex flexDirection="column" justifyContent="space-between">
          <Text textStyle="label" color="#FCFCFC">
            {stream.topic_detail.name}
          </Text>

          <Box>
            <Text
              pb={space.xxxxs}
              textStyle="caption"
              lineHeight="1.4rem"
              color={colors.textTertiary}
            >
              {stream.host_detail.name}
            </Text>
            <Flex gridGap={4} alignItems="center">
              <Icon color={colors.textSecondary} icon="Calendar" size={14} />
              <Text
                color={colors.textSecondary}
                textStyle="caption"
                lineHeight="1.8rem"
              >
                {startTime}
              </Text>
            </Flex>
          </Box>
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

      return {
        ...base,
        hovered: {
          ...base.hovered,
          top: -26,
          bottom: -18,
          right: 0,
          left: -36,
        },
      };
    }, []);

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
                    <Flex
                      px={space.xxxxs}
                      py={space.xxxxs}
                      alignItems="center"
                      gridGap={space.xxxxs}
                    >
                      <Text color={colors.accentLight} opacity={0.8}>
                        RSVP
                      </Text>
                      <Icon icon="CheckCircle" color={colors.green[0]} />
                    </Flex>
                  );
                }

                if (loading) {
                  return (
                    <Flex
                      px={space.xxxxs}
                      py={space.xxxxs}
                      alignItems="center"
                      gridGap={space.xxxxs}
                    >
                      <Text color={colors.accentLight} opacity={0.8}>
                        RSVP
                      </Text>
                      <Spinner size={16} />
                    </Flex>
                  );
                }

                return (
                  <Text
                    px={space.xxxxs}
                    py={space.xxxxs}
                    cursor="pointer"
                    color={colors.accentLight}
                    onClick={async (event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      setLoading(true);
                      onClickRsvp && (await onClickRsvp(stream));
                      setLoading(false);
                    }}
                  >
                    RSVP
                  </Text>
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
          <Grid
            pb={space.xs}
            gridTemplateColumns="max-content 1fr"
            gridGap={space.xxxs}
            key={stream.id}
          >
            {image}
            {streamDetails}
          </Grid>
        </AnimatedBox>

        <AnimatedBox
          position="absolute"
          borderRadius={radii.xxxxs}
          variants={hoverCardAnim}
          bg={colors.primaryDark}
        >
          <Box p={space.xxxxs}>
            <Link
              href={link ?? PageRoutes.session(stream.id)}
              boxProps={{ target: "_blank" }}
            >
              <Grid
                gridTemplateColumns="max-content 1fr"
                gridGap={space.xxxs}
                key={stream.id}
              >
                {image}
                {streamDetails}
              </Grid>
            </Link>
            <Flex flexDirection="row" gridGap={space.xxxxs} alignItems="start">
              <Button
                variant="secondary-dark-flat"
                mt={space.xxxxs}
                display="block"
                w="100%"
                label="GO TO STREAM PAGE"
                onClick={() => router.push(PageRoutes.session(stream.id))}
              />

              {(() => {
                if (!user) {
                  return null;
                }

                if (user.pk === stream.host) {
                  return null;
                }

                if (stream.has_rsvp) {
                  return (
                    <Button
                      variant="secondary-dark-flat"
                      mt={space.xxxxs}
                      disabled={true}
                      display="block"
                      w="100%"
                      label="RSVP"
                      suffixElement={
                        <Icon
                          size={20}
                          icon="CheckCircle"
                          color={colors.greenSuccess}
                        />
                      }
                    />
                  );
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
                    display="block"
                    w="100%"
                    label="RSVP"
                    suffixElement={loading ? <Spinner size={20} /> : undefined}
                  />
                );
              })()}
            </Flex>
          </Box>
        </AnimatedBox>
      </AnimatedBox>
    );
  }
);

StreamsPanelUpcomingStreamCard.displayName = "StreamsPanelUpcomingStreamCard";

StreamsPanelUpcomingStreamCard.defaultProps = {
  link: undefined,
  onClickRsvp: undefined,
};

export default StreamsPanelUpcomingStreamCard;
