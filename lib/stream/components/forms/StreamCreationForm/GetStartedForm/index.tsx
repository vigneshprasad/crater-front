import { useTheme } from "styled-components";

import { Box, Flex, Icon, Text } from "@/common/components/atoms";
import { MultiSelect } from "@/common/components/atoms/MultiSelect";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { StreamCategory } from "@/creators/types/stream";

type IProps = {
  value?: StreamCategory[];
  error?: string;
  onChange: (val: unknown) => void;
};

export default function GetStartedForm({
  value,
  error,
  onChange,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  return (
    <Box>
      <Box>
        <Text textStyle="formLabel" fontWeight={400}>
          What kind of stream are you planning?
        </Text>
        <Flex py={space.xs} gridGap={space.xxs}>
          <Box
            w={248}
            p={space.xs}
            bg={colors.primaryLight}
            borderRadius={radii.xxxxs}
            border={`1px solid ${colors.accentLight}`}
          >
            <Flex gridGap={space.xxxxxs}>
              <Icon icon="Page" size={16} />
              <Text textStyle="menu" lineHeight="1.6rem">
                Single Stream
              </Text>
            </Flex>
          </Box>

          <Box
            w={248}
            p={space.xs}
            bg={colors.primaryLight}
            borderRadius={radii.xxxxs}
            position="relative"
          >
            <Box
              position="absolute"
              p={`${space.xxxxxs}px ${space.xxxxs}px`}
              bg={colors.secondaryLight}
              borderRadius={2}
              top={-10}
              right={-10}
            >
              <Text textStyle="inputLabel" fontWeight={700}>
                Coming Soon
              </Text>
            </Box>
            <Flex gridGap={space.xxxxxs}>
              <Icon icon="Pages" size={16} color={colors.textTertiary} />
              <Text
                textStyle="menu"
                lineHeight="1.6rem"
                color={colors.textTertiary}
              >
                Series of Streams
              </Text>
            </Flex>
          </Box>
        </Flex>
      </Box>
      <Box>
        <Text pb={space.xxxs} textStyle="formLabel" fontWeight={400}>
          Choose one or more categories for your stream
        </Text>
        <Text
          pt={space.xxxxxs}
          pb={space.xxxs}
          color={colors.textTertiary}
          textStyle="small"
        >
          A maximum of 3 categories can be selected.
        </Text>
        <Box w={512}>
          <MultiSelect<StreamCategory>
            placeholder="Select"
            dataUrl={API_URL_CONSTANTS.stream.getCategories}
            labelGetter={(item) => item.name}
            onChange={(val) => onChange(val)}
            maxLength={3}
            value={value}
            error={error}
          />
        </Box>
      </Box>
    </Box>
  );
}
