import { useCallback, useMemo, useState } from "react";
import { useTheme } from "styled-components";
import useSWR from "swr";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import {
  Box,
  Button,
  Flex,
  Grid,
  Modal,
  Text,
} from "@/common/components/atoms";
import ProgressBar from "@/common/components/objects/ProgressBar";
import { PageRoutes } from "@/common/constants/route.constants";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Creator } from "@/creators/types/creator";

import StreamCreationModalAnalytics from "../StreamCreationModalAnalytics";
import StreamCreationModalEditStream from "../StreamCreationModalEditStream";
import StreamCreationModalSuccess from "../StreamCreationModalSuccess";
import StreamCreationModalTestGear from "../StreamCreationModalTestGear";
import StreamCreationModalTrackData from "../StreamCreationModalTrackData";

interface IProps {
  streamId?: number;
  visible: boolean;
  onClose: () => void;
}

enum ModalPage {
  InitialPage,
  TrackData,
  TestGear,
  EditStream,
  Analytics,
}

const MODAL_PAGES = [
  ModalPage.InitialPage,
  ModalPage.TrackData,
  ModalPage.TestGear,
  ModalPage.EditStream,
  ModalPage.Analytics,
];

export default function PostStreamCreationModal({
  streamId,
  visible,
  onClose,
}: IProps): JSX.Element {
  const router = useRouter();
  const { space, radii, colors } = useTheme();
  const [currentModalPage, setCurrentModalPage] = useState<number>(0);
  const { user } = useAuth();

  const onCloseModal = useCallback(() => {
    setCurrentModalPage(0);
    onClose();
  }, [onClose]);

  const nextScreen = useCallback(() => {
    const lastIndex = MODAL_PAGES.length - 1;

    if (lastIndex - MODAL_PAGES[currentModalPage] > 0) {
      setCurrentModalPage((prevValue) => prevValue + 1);
    }
  }, [currentModalPage]);

  const previousScreen = useCallback(() => {
    if (MODAL_PAGES[currentModalPage] > 0) {
      setCurrentModalPage((prevValue) => prevValue - 1);
    }
  }, [currentModalPage]);

  const skipAllScreens = useCallback(() => {
    router.push(PageRoutes.session(`${streamId}`));
  }, [router, streamId]);

  const { data: creator } = useSWR<Creator>(
    user ? API_URL_CONSTANTS.creator.getMyCreator : null
  );

  const pages = useMemo<
    {
      key: number;
      display: JSX.Element;
      prevButton?: boolean;
      nextButton?: boolean;
      skipAllButton?: boolean;
      showStep?: boolean;
      doneButton?: boolean;
    }[]
  >(() => {
    return [
      {
        key: ModalPage.InitialPage,
        display: <StreamCreationModalSuccess />,
        nextButton: true,
        skipAllButton: true,
      },
      {
        key: ModalPage.TrackData,
        display: <StreamCreationModalTrackData />,
        prevButton: true,
        nextButton: true,
        showStep: true,
      },
      {
        key: ModalPage.TestGear,
        display: <StreamCreationModalTestGear streamId={streamId} />,
        prevButton: true,
        nextButton: true,
        showStep: true,
      },
      {
        key: ModalPage.EditStream,
        display: <StreamCreationModalEditStream creator={creator} />,
        prevButton: true,
        nextButton: true,
        showStep: true,
      },
      {
        key: ModalPage.Analytics,
        display: <StreamCreationModalAnalytics />,
        prevButton: true,
        doneButton: true,
        showStep: true,
      },
    ];
  }, [streamId, creator]);

  return (
    <Modal
      p={space.xxs}
      maxWidth={680}
      maxHeight={346}
      borderRadius={radii.xxxs}
      onClose={onCloseModal}
      visible={visible}
      display="grid"
      gridTemplateColumns="1fr 1fr"
      gridTemplateRows="max-content 1fr max-content"
      gridGap={space.xxxxs}
      overflowY="hidden"
      backgroundColor="#272727"
      iconButtonProps={{ variant: "flatNoBg", iconProps: { size: 28 } }}
      modalVisibility={["hidden", "visible"]}
    >
      {pages.map(
        ({
          key,
          display,
          prevButton,
          nextButton,
          skipAllButton,
          showStep,
          doneButton,
        }) => {
          return (
            MODAL_PAGES[currentModalPage] === key && (
              <>
                {display}

                <Box gridColumn="1 / span 2">
                  <Box pb={space.xxs}>
                    <ProgressBar
                      percent={key * 25}
                      backgroundColor={colors.black[0]}
                      barProps={{ backgroundColor: "#86F07D" }}
                    />
                  </Box>

                  <Grid
                    gridTemplateColumns="1fr 1fr max-content"
                    alignItems="center"
                  >
                    {showStep ? (
                      <Text textStyle="captionLarge" flexGrow={1}>
                        Step {key} of {MODAL_PAGES.length - 1}
                      </Text>
                    ) : (
                      <Box />
                    )}

                    <Flex
                      gridGap={space.xxs}
                      alignItems="center"
                      justifyContent="start"
                      flexGrow={1}
                    >
                      {MODAL_PAGES.map((page) => {
                        return MODAL_PAGES[currentModalPage] === page ? (
                          <Box
                            w={10}
                            h={10}
                            borderRadius="50%"
                            backgroundColor={colors.accent}
                          />
                        ) : (
                          <Box
                            w={10}
                            h={10}
                            borderRadius="50%"
                            backgroundColor={colors.black[0]}
                          />
                        );
                      })}
                    </Flex>

                    <Flex gridGap={space.xxs}>
                      {prevButton && (
                        <Button
                          p={0}
                          text="Prev"
                          variant="text-button"
                          justifySelf="flex-end"
                          textProps={{
                            minWidth: "auto",
                            color: "#c4c4c4",
                            p: 0,
                          }}
                          onClick={previousScreen}
                        />
                      )}
                      {skipAllButton && (
                        <Button
                          p={0}
                          text="Skip all"
                          variant="text-button"
                          textProps={{
                            minWidth: "auto",
                            color: "#c4c4c4",
                            p: 0,
                          }}
                          onClick={skipAllScreens}
                        />
                      )}

                      {nextButton && (
                        <Button
                          text="Next"
                          variant="small"
                          onClick={nextScreen}
                          width={80}
                          minHeight={36}
                          borderRadius={radii.xxxs}
                          borderWidth={0}
                          textProps={{
                            minWidth: "auto",
                            px: space.xxs,
                            py: space.xxxxs,
                          }}
                        />
                      )}

                      {doneButton && (
                        <Button
                          text="Done"
                          variant="small"
                          onClick={onCloseModal}
                          width={80}
                          minHeight={36}
                          borderRadius={radii.xxxs}
                          borderWidth={0}
                          textProps={{
                            minWidth: "auto",
                            px: space.xxs,
                            py: space.xxxxs,
                          }}
                        />
                      )}
                    </Flex>
                  </Grid>
                </Box>
              </>
            )
          );
        }
      )}
    </Modal>
  );
}
