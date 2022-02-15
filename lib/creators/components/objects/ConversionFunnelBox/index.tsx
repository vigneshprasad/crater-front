import {
  Funnel,
  FunnelChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "styled-components";

import { Box, Card, Shimmer, Text } from "@/common/components/atoms";
import { ConversionFunnel } from "@/creators/types/creator";

interface IProps {
  conversionFunnelData?: ConversionFunnel[];
}

export default function ConversionFunnelBox({
  conversionFunnelData,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  if (conversionFunnelData === undefined || conversionFunnelData === null) {
    return <Shimmer w="100%" h="100%" />;
  }

  return (
    <Card containerProps={{ px: space.xs, py: space.xs }}>
      <Text pb={space.xs} textStyle="headline5">
        Your Conversion Funnel
      </Text>

      <Box h={240}>
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Tooltip />
            <Funnel
              dataKey="count"
              data={conversionFunnelData}
              isAnimationActive
            >
              <LabelList
                position="insideTop"
                offset={10}
                fill={colors.white[0]}
                stroke="none"
                dataKey="name"
                fontSize="1.3rem"
              />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </Box>
    </Card>
  );
}
