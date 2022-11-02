import { useState } from "react";
import styled, { useTheme } from "styled-components";
import useSWR from "swr";

import useAuth from "@/auth/context/AuthContext";
import { Box, Flex, Grid, Icon, Text } from "@/common/components/atoms";
import { Modal } from "@/common/components/atoms/v2";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Webinar } from "@/community/types/community";
import { Creator } from "@/creators/types/creator";
import { StreamCreationSteps } from "@/stream/types/stream";

import StreamCreationForm from "../../forms/StreamCreationForm";
import PostStreamCreationModal from "../PostStreamCreationModal";

const CustomFlex = styled(Flex)`
  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
    cursor: pointer;
  }
`;

type IProps = {
  visible: boolean;
  onClose: () => void;
};

const steps = [
  {
    key: StreamCreationSteps.GetStarted,
    name: "Get Started",
  },
  {
    key: StreamCreationSteps.BasicDetails,
    name: "Basic Details",
  },
  {
    key: StreamCreationSteps.AddThumbnail,
    name: "Thumbnail",
  },
  {
    key: StreamCreationSteps.OtherSettings,
    name: "Other Settings",
  },
];

export default function StreamCreationModal({
  visible,
  onClose,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const { user } = useAuth();
  const [showPostStreamCreationModal, setShowPostStreamCreationModal] =
    useState(false);
  const [latestStream, setLatestStream] = useState<number | undefined>(
    undefined
  );
  const [activeStep, setActiveStep] = useState(0);

  const { data: creator } = useSWR<Creator>(
    user ? API_URL_CONSTANTS.creator.getMyCreator : null
  );

  const postStreamCreation = (stream: Webinar): void => {
    onClose();
    setLatestStream(stream.id);

    setShowPostStreamCreationModal(true);
  };

  return (
    <>
      <PostStreamCreationModal
        streamId={latestStream}
        visible={showPostStreamCreationModal}
        onClose={() => setShowPostStreamCreationModal(false)}
      />
      <Modal
        w={1132}
        h={590}
        borderRadius={radii.xxxxs}
        border={`1px solid ${colors.secondaryLight}`}
        visible={visible}
        onClose={onClose}
      >
        <Grid
          h="100%"
          gridTemplateColumns="max-content minmax(0, 1fr)"
          gridTemplateRows="min-content minmax(0, 1fr)"
          gridTemplateAreas={`
            "heading heading"
            "side-nav form"
          `}
        >
          <Box
            gridArea="heading"
            pl={24}
            pr={space.xxs}
            py={space.xxs}
            borderBottom={`1px solid ${colors.primaryLight}`}
          >
            <Text
              textStyle="menu"
              lineHeight="1.6rem"
              textTransform="uppercase"
            >
              Create a new stream
            </Text>
          </Box>

          <Box
            gridArea="side-nav"
            borderRight={`1px solid ${colors.primaryLight}`}
          >
            <Grid
              py={space.xs}
              h="100%"
              gridAutoFlow="row"
              gridTemplateRows="1fr 1fr"
              gridRowGap={space.xs}
            >
              <Flex px={space.xxs} flexDirection="column" gridGap={space.xxxxs}>
                {steps.map(({ key, name }, index) => (
                  <CustomFlex
                    px={8}
                    py={6}
                    flexDirection="row"
                    alignItems="center"
                    gridGap={space.xxxs}
                    bg={key === activeStep ? colors.primaryLight : undefined}
                    borderRadius={radii.xxxxs}
                    key={key}
                    onClick={() => setActiveStep(key)}
                  >
                    <Text
                      w={24}
                      h={24}
                      textStyle="caption"
                      bg={colors.secondaryLight}
                      border={`1px solid ${colors.textQuartenary}`}
                      borderRadius="50%"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {index + 1}
                    </Text>
                    <Text
                      textStyle="captionLarge"
                      fontWeight={600}
                      lineHeight="1.6rem"
                    >
                      {name}
                    </Text>
                  </CustomFlex>
                ))}
              </Flex>

              {/* <Box w="100%" borderTop={`1px solid ${colors.primaryLight}`}>
                <Button
                  w={180}
                  my={space.xs}
                  mx={space.xxs}
                  variant="text"
                  label="Help Center"
                  prefixElement={
                    <Icon
                      icon="QuestionMark"
                      size={20}
                      color={colors.accentLight}
                    />
                  }
                  suffixElement={
                    <Icon icon="PopOut" size={16} color={colors.accentLight} />
                  }
                  display="flex"
                  gridProps={{ px: 10, py: space.xxxxs }}
                  textProps={{
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    lineHeight: "1.6rem",
                  }}
                />
              </Box> */}

              <Box px={24} pb={space.xs} alignSelf="end">
                <Text
                  py={space.xxxxxs}
                  textStyle="caption"
                  fontWeight={600}
                  lineHeight="1.4rem"
                  color={colors.textTertiary}
                >
                  YOUR POC
                </Text>
                <Flex py={space.xxxs} alignItems="center" gridGap={6}>
                  <Icon icon="Profile" size={12} fill={true} />
                  <Text textStyle="menu" lineHeight="1.6rem">
                    {creator?.point_of_contact_detail?.name}
                  </Text>
                </Flex>
                <Flex alignItems="center" gridGap={6}>
                  <Icon icon="Phone" size={12} />
                  <Text textStyle="menu" lineHeight="1.6rem">
                    {creator?.point_of_contact_detail?.phone_number}
                  </Text>
                </Flex>
              </Box>
            </Grid>
          </Box>

          <Box pb={space.xxxs} gridArea="form">
            <StreamCreationForm
              postSubmit={postStreamCreation}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />
          </Box>
        </Grid>
      </Modal>
    </>
  );
}
