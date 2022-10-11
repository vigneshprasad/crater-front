import { useTheme } from "styled-components";

import { Box, Flex, Icon, Span, Text } from "@/common/components/atoms";
import { Input } from "@/common/components/atoms/v2";
import FormField from "@/common/components/objects/FormField";

type Field = {
  value: string;
  error?: string;
  onChange: (val: unknown) => void;
};

type IProps = {
  rtmpLink: Field;
  rtmpKey: Field;
};

export default function OtherSettingsForm({
  rtmpLink,
  rtmpKey,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();

  return (
    <Box pb={space.xxs}>
      <Text textStyle="formLabel" fontWeight={400}>
        Stream everywhere, at once!
      </Text>
      <FormField
        py={0}
        pt={space.xxs}
        gridAutoFlow="row"
        gridTemplateColumns="1fr"
        gridGap={space.xxxs}
        border={false}
        label="RTMP Link"
        subtext="RTMP stands for Real-Time Messaging Protocol, which is a way for you to stream on multiple platforms at once"
      >
        <Input
          value={rtmpLink.value}
          error={rtmpLink.error}
          onChange={(e) => rtmpLink.onChange(e.currentTarget.value)}
          placeholder="Example: rtmps://a.rtmp.youtube.com/live"
          containerProps={{
            w: 642,
            py: 9,
            focusBorderColor: colors.accentLight,
          }}
        />
      </FormField>
      <FormField
        py={0}
        pt={space.xxs}
        pb={space.xs}
        gridAutoFlow="row"
        gridTemplateColumns="1fr"
        gridGap={space.xxxs}
        border={false}
        label="RTMP Stream Key"
        subtext="Enter the RTMP Stream Key here which you can find with the link"
      >
        <Input
          value={rtmpKey.value}
          error={rtmpKey.error}
          onChange={(e) => rtmpKey.onChange(e.currentTarget.value)}
          containerProps={{
            w: 642,
            py: 9,
            focusBorderColor: colors.accentLight,
          }}
        />
      </FormField>
      <Box
        pt={space.xxs}
        pl={space.xxs}
        pb={space.xs}
        pr={30}
        w={642}
        bg={colors.primaryLight}
        borderRadius={radii.xxxxs}
      >
        <Text
          pb={space.xxxxs}
          textStyle="captionLarge"
          color={colors.accentLight}
        >
          More about RTMP Link
        </Text>
        <Text
          textStyle="captionLarge"
          lineHeight="2.1rem"
          color={colors.textTertiary}
        >
          Generally, you can find this link in the{" "}
          <Span fontWeight={600} color={colors.textPrimary}>
            Stream Settings
          </Span>{" "}
          section of whichever platform you wish to stream on along with Crater.
          For example, the RTMP link for YouTube can be found in the{" "}
          <Span fontWeight={600} color={colors.textPrimary}>
            Stream Settings
          </Span>{" "}
          section in the{" "}
          <Span fontWeight={600} color={colors.textPrimary}>
            Stream
          </Span>
          tab of{" "}
          <Span fontWeight={600} color={colors.textPrimary}>
            YouTube Studio
          </Span>
          .{" "}
          <a
            href="https://www.youtube.com/watch?v=SlDjnRCaLoQ"
            target="_blank"
            rel="noreferrer"
          >
            <Span pt={space.xxs}>
              <Flex alignItems="center" gridGap={space.xxxxxs}>
                <Text
                  textStyle="captionLarge"
                  lineHeight="2.1rem"
                  color={colors.textTertiary}
                >
                  For more help on RTMP URL,{" "}
                  <Span color={colors.accentLight}>visit this link</Span>
                </Text>
                <Icon icon="PopOut" size={14} color={colors.accentLight} />
              </Flex>
            </Span>
          </a>
        </Text>
      </Box>
    </Box>
  );
}
