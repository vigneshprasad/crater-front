import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { SalePaymentType } from "@/auction/types/sales";
import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import { Box, Flex, Icon, Spinner } from "@/common/components/atoms";
import { SideDrawer } from "@/common/components/atoms/SideDrawer";
import { Text } from "@/common/components/atoms/System/Text";
import { Button } from "@/common/components/atoms/v2/Button";
import { PageRoutes } from "@/common/constants/route.constants";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import DateTime from "@/common/utils/datetime/DateTime";
import WebinarApiClient from "@/community/api";
import { usePrivateStreamReward } from "@/community/context/PrivateStreamRewardContext";
import { useWebinarRequest } from "@/community/context/WebinarRequestContext";
import {
  ParticpantType,
  PostGroupRequest,
  PrivacyType,
  RequestStatus,
  Webinar,
} from "@/community/types/community";
import RewardSalePayment from "@/tokens/components/objects/RewardSalePayment";

interface IProps {
  id: string;
  onRsvpSubmit: () => void;
  webinar: Webinar;
}

const StyledBox = styled(Box)`
  position: relative;
  position: relative;
  padding: 0.5em 0.3em;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 4px;
    border-left: 1px solid transparent;
    background: linear-gradient(
        90.47deg,
        #d5bbff 17.58%,
        #9db3ff 85.38%,
        #0d849e 85.38%
      )
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;

export default function RsvpButton({
  id,
  webinar,
  onRsvpSubmit,
}: IProps): JSX.Element {
  const { colors, zIndices, space } = useTheme();
  const { user } = useAuth();
  const { track } = useAnalytics();
  const { rewardSale } = usePrivateStreamReward();
  const { webinarRequest, mutateRequest } = useWebinarRequest();
  const { openModal } = useAuthModal();
  const router = useRouter();

  const isHost = useMemo(() => {
    if (!user || !webinar) return false;

    return user.pk == webinar.host || webinar.speakers?.includes(user.pk);
  }, [user, webinar]);

  const [rsvpBtnLoading, setRsvpBtnLoading] = useState(false);

  const autoRsvp = useCallback(async () => {
    await router.replace({
      query: {
        ...router.query,
        join: true,
        newUser: true,
      },
    });
    openModal();
  }, [router, openModal]);

  const postGroupRequest = useCallback(
    async (redirect = false): Promise<void> => {
      if (webinar) {
        if (webinarRequest?.status !== RequestStatus.accepted) {
          setRsvpBtnLoading(true);
          const data: PostGroupRequest = {
            group: parseInt(id, 10),
            participant_type: ParticpantType.attendee,
            status: RequestStatus.accepted,
          };

          const [request] = await WebinarApiClient().postWebinarRequest(data);

          if (request) {
            track(AnalyticsEvents.rsvp_stream, {
              stream: webinar.id,
              stream_name: webinar.topic_detail?.name,
              host: {
                ...webinar.host_detail,
              },
            });

            mutateRequest(request);
          }
        }

        if (redirect) {
          track(AnalyticsEvents.join_stream, {
            stream: webinar.id,
            stream_name: webinar.topic_detail?.name,
            host: {
              ...webinar.host_detail,
            },
          });
          router.push(PageRoutes.stream(webinar.id.toString()));

          return;
        }

        setRsvpBtnLoading(false);
        onRsvpSubmit();
      }
    },
    [
      webinar,
      webinarRequest?.status,
      onRsvpSubmit,
      id,
      track,
      mutateRequest,
      router,
    ]
  );

  useEffect(() => {
    const action = async (): Promise<void> => {
      await postGroupRequest();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { join, ...query } = router.query;
      router.replace({ query: { ...query } });
    };

    if (router.query?.join === "true" && user && webinar) {
      if (!isHost) action();
    }
  }, [router, user, webinar, postGroupRequest, track, isHost]);

  const [saleVisible, setSaleVisible] = useState(false);

  const startTime = DateTime.parse(webinar.start);
  const now = DateTime.now();

  if (
    webinar.privacy == PrivacyType.private &&
    !(webinarRequest && webinarRequest.status === RequestStatus.accepted) &&
    !isHost
  ) {
    if (rewardSale) {
      if (rewardSale.payment_type == SalePaymentType.UPI) {
        //Private stream with reward UPI Payment - CHECK
        return (
          <>
            {saleVisible && (
              <SideDrawer
                px={0}
                py={0}
                visible={saleVisible ? true : false}
                heading="Crater Store"
                boxProps={{ ml: space.xs, mr: 22, pt: 28 }}
                onClose={() => setSaleVisible(false)}
              >
                <RewardSalePayment sale={rewardSale} />
              </SideDrawer>
            )}
            <Button
              variant="payment-upi"
              label="Pay to get Access"
              w={["100%", "auto"]}
              minHeight={44}
              h={[44, "auto"]}
              onClick={() => {
                if (user) {
                  setSaleVisible(true);
                } else {
                  openModal();
                }
              }}
              suffixElement={
                <Box
                  w="60px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minHeight={44}
                  h={[44, "auto"]}
                  background="rgba(197, 151, 0, 1)"
                >
                  <Text
                    color={colors.black[7]}
                    textStyle="label"
                  >{`₹${rewardSale.price}`}</Text>
                </Box>
              }
            />
          </>
        );
      }
      if (rewardSale.payment_type == SalePaymentType.LEARN) {
        //Private stream with reward LEARN Payment - CHECK
        return (
          <>
            {saleVisible && (
              <SideDrawer
                px={0}
                py={0}
                visible={saleVisible ? true : false}
                heading="Crater Store"
                boxProps={{ ml: space.xs, mr: 22, pt: 28 }}
                onClose={() => setSaleVisible(false)}
              >
                <RewardSalePayment sale={rewardSale} />
              </SideDrawer>
            )}
            <Box>
              <Button
                variant="payment-learn"
                label="Pay to get Access"
                w={["100%", "auto"]}
                minHeight={44}
                h={[44, "auto"]}
                onClick={() => {
                  if (user) {
                    setSaleVisible(true);
                  } else {
                    openModal();
                  }
                }}
                suffixElement={
                  <StyledBox
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={44}
                    h={[44, "auto"]}
                  >
                    <Flex
                      mx={space.xxxxs}
                      alignItems="center"
                      gridGap={space.xxxxxs}
                    >
                      <Icon icon="LearnToken" size={16} />
                      <Text fontSize="1.4rem">{rewardSale.price}</Text>
                    </Flex>
                  </StyledBox>
                }
              />
            </Box>
          </>
        );
      }
    } else {
      //Private stream no reward - CHECK
      return (
        <Button
          variant="flat-with-disabled-dark"
          label="Invite Only Stream"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight={44}
          h={[44, "auto"]}
          w="100%"
          zIndex={[zIndices.overlay - 10, "auto"]}
          disabled={true}
          textProps={{
            textStyle: "label",
          }}
        />
      );
    }
  }

  if (user) {
    if (isHost) {
      if (now < startTime.minus({ minutes: 30 })) {
        //Host not close to live stream start
        return (
          <Button
            variant="flat-with-disabled-dark"
            label="Test Livestream"
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="100%"
            minHeight={44}
            h={[44, "auto"]}
            textProps={{
              textStyle: "label",
            }}
            onClick={() => router.push(PageRoutes.stream(webinar.id))}
          />
        );
      }

      //Host close to live stream start - CHECK
      return (
        <Button
          variant="flat-with-disabled-dark"
          label="Go Live"
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          minHeight={44}
          h={[44, "auto"]}
          textProps={{
            textStyle: "label",
          }}
          onClick={() => router.push(PageRoutes.stream(webinar.id))}
        />
      );
    } else {
      if (webinar.is_live || now >= startTime.minus({ minutes: 10 })) {
        // User case close to live stream time - CHECK
        return (
          <Button
            variant="flat-with-disabled-dark"
            label="Join livestream"
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="100%"
            minHeight={44}
            h={[44, "auto"]}
            zIndex={[zIndices.overlay - 10, "auto"]}
            textProps={{
              textStyle: "label",
            }}
            onClick={() => postGroupRequest(true)}
          />
        );
      }

      if (webinarRequest && webinarRequest.status === RequestStatus.accepted) {
        // User case already joined - CHECK
        return (
          <Button
            variant="flat-with-disabled-dark"
            label="We'll remind you"
            display="flex"
            justifyContent="center"
            alignItems="center"
            w="100%"
            minHeight={44}
            h={[44, "auto"]}
            disabled={true}
            suffixElement={
              rsvpBtnLoading ? (
                <Spinner size={24} strokeColor={colors.white[0]} />
              ) : (
                <Icon
                  icon="CheckCircle"
                  size={18}
                  color={colors.greenSuccess}
                />
              )
            }
            textProps={{
              textStyle: "label",
            }}
            onClick={() => postGroupRequest(true)}
          />
        );
      }

      // User default case when not joined - CHECK
      return (
        <Button
          variant="flat-with-disabled-dark"
          label="Remind Me"
          display="flex"
          justifyContent="center"
          alignItems="center"
          w="100%"
          minHeight={44}
          h={[44, "auto"]}
          suffixElement={
            rsvpBtnLoading ? (
              <Spinner size={24} strokeColor={colors.white[0]} />
            ) : (
              <Icon
                icon="IcNotficationFill"
                size={18}
                color={colors.white[0]}
              />
            )
          }
          textProps={{
            textStyle: "label",
          }}
          onClick={() => postGroupRequest()}
        />
      );
    }
  }

  //Non-user Case
  return (
    <Button
      variant="flat-with-disabled-dark"
      label="Remind Me"
      display="flex"
      justifyContent="center"
      alignItems="center"
      w="100%"
      minHeight={44}
      h={[44, "auto"]}
      suffixElement={
        rsvpBtnLoading ? (
          <Spinner size={24} strokeColor={colors.white[0]} />
        ) : (
          <Icon icon="IcNotficationFill" size={18} color={colors.white[0]} />
        )
      }
      textProps={{
        textStyle: "label",
      }}
      onClick={() => {
        track(AnalyticsEvents.rsvp_button_clicked, {
          new_user: true,
          session: webinar.id,
        });
        autoRsvp();
      }}
    />
  );
}
