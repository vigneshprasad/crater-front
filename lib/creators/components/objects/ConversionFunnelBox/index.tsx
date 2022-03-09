import { useTheme } from "styled-components";

import {
  Box,
  Card,
  CardProps,
  Flex,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import colors from "@/common/theme/colors";
import { ConversionFunnel } from "@/creators/types/creator";

interface IProps extends CardProps {
  conversionFunnelData?: ConversionFunnel[];
}

export default function ConversionFunnelBox({
  conversionFunnelData,
  ...rest
}: IProps): JSX.Element {
  const { space } = useTheme();

  if (conversionFunnelData === undefined) {
    return <Shimmer w="100%" h="100%" />;
  }

  return (
    <Card containerProps={{ px: space.xs, py: space.xs }} {...rest}>
      <Text pb={space.xs} textStyle="headline5">
        Your Conversion Funnel
      </Text>

      <Flex flexDirection="column" alignItems="center" gridGap={space.xs}>
        {conversionFunnelData.map((obj, index) => {
          return (
            <Flex
              flexDirection="column"
              w={[
                450 / (index / 4.5 + 1),
                450 / (index / 4.5 + 1),
                450 / (index / 4.5 + 1),
              ]}
              h={[80, 80, 80]}
              key={obj.name}
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderTop={[
                `80px solid ${colors.black[0]}`,
                `80px solid ${colors.black[0]}`,
                `80px solid ${colors.black[0]}`,
              ]}
              borderLeft="25px solid transparent"
              borderRight="25px solid transparent"
            >
              <Box mt={["-77px", "-77px", "-77px"]}>
                <Text textStyle="headline6">{obj.name}</Text>
                <Text textStyle="headline6">
                  {obj.value} {obj.name !== "RSVP" ? "%" : ""}
                </Text>
              </Box>
            </Flex>
          );
        })}
      </Flex>
    </Card>
  );
}
