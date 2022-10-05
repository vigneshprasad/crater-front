import { useTheme } from "styled-components";

import { Box, Flex, Icon, Text, TextArea } from "@/common/components/atoms";
import { Input } from "@/common/components/atoms/v2";
import DateTimeInput from "@/common/components/objects/DateTimeInput";
import FormField from "@/common/components/objects/FormField";

type Field = {
  value: string;
  error?: string;
  onChange: (val: unknown) => void;
};

type IProps = {
  topic: Field;
  description: Field;
  dateAndTime: Field;
};

export default function BasicDetailsForm({
  topic,
  description,
  dateAndTime,
}: IProps): JSX.Element {
  const { space, colors, radii, borders } = useTheme();

  return (
    <Box>
      <Text textStyle="formLabel" fontWeight={400}>
        Give your stream a title and description
      </Text>
      <FormField
        gridAutoFlow="row"
        gridTemplateColumns="1fr"
        gridGap={space.xxxs}
        border={false}
        label="Topic of the stream"
      >
        <Input
          value={topic.value}
          error={topic.error}
          onChange={(e) => topic.onChange(e.currentTarget.value)}
          containerProps={{
            w: 642,
            py: 9,
            focusBorderColor: colors.accentLight,
          }}
        />
      </FormField>
      <FormField
        gridAutoFlow="row"
        gridTemplateColumns="1fr"
        gridGap={space.xxxs}
        border={false}
        label="Description of the stream"
        subtext="This is optional, but it is recommended to have a short description about your stream"
      >
        <TextArea
          value={description.value}
          onChange={(e) => description.onChange(e.currentTarget.value)}
          rows={6}
          inputProps={{
            width: 642,
            px: space.xxxs,
            backgroundColor: colors.primaryBackground,
            border: `1px solid ${borders.input}`,
            focusBorderColor: colors.accentLight,
          }}
        />
      </FormField>
      <FormField
        gridAutoFlow="row"
        gridTemplateColumns="1fr"
        border={false}
        label="Time and Date of the stream"
      >
        <Flex pt={10} pb={14} alignItems="center" gridGap={space.xxxxxs}>
          <Icon icon="InfoFill" size={16} color="#98ABF9" />
          <Text
            textStyle="caption"
            fontWeight={600}
            lineHeight="1.4rem"
            color="#98ABF9"
          >
            We suggest scheduling streams for 24 to 48 hours later so that
            viewers can discover it on the platform.
          </Text>
        </Flex>
        <DateTimeInput
          type="datetime-local"
          value={dateAndTime.value}
          error={dateAndTime.error}
          onChange={(e) => dateAndTime.onChange(e.currentTarget.value)}
          containerProps={{
            w: 288,
            focusBorderColor: colors.accentLight,
          }}
        />
      </FormField>
      <FormField
        gridAutoFlow="row"
        gridTemplateColumns="1fr"
        gridGap={space.xxxs}
        border={false}
        label="Co-Host"
        subtext="Collaborate and stream with a co-host"
      >
        <Box
          w={642}
          h={40}
          position="relative"
          bg={colors.primaryBackground}
          border={`1px solid ${colors.primaryLight}`}
          borderRadius={radii.xxxxs}
        >
          <Box
            position="absolute"
            p={`${space.xxxxxs}px ${space.xxxxs}px`}
            bg={colors.secondaryLight}
            borderRadius={2}
            right={-10}
            top={-10}
          >
            <Text textStyle="inputLabel" fontWeight={700}>
              Coming Soon
            </Text>
          </Box>
        </Box>
      </FormField>
    </Box>
  );
}
