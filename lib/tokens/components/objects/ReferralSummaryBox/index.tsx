import { useMemo } from "react";
import { useTheme } from "styled-components";

import { Card, Flex, Grid, Shimmer, Text } from "@/common/components/atoms";

interface IProps {
  referralCount?: number;
  totalPayable?: number;
  totalPaidOut?: number;
  outstandingPayment?: number;
}

type ValueKeys = keyof IProps;

export default function ReferralSummaryBox(props: IProps): JSX.Element {
  const { referralCount, totalPayable, totalPaidOut, outstandingPayment } =
    props;
  const { space, borders, colors } = useTheme();

  const columns = useMemo<
    {
      title: string;
      key: ValueKeys;
      display: string;
    }[]
  >(() => {
    return [
      {
        title: "Referrals",
        key: "referralCount",
        display: `${referralCount}`,
      },
      {
        title: "Total Payable",
        key: "totalPayable",
        display: `${totalPayable}`,
      },
      {
        title: "Total Paid Out",
        key: "totalPaidOut",
        display: `${totalPaidOut}`,
      },
      {
        title: "Outstanding Payment",
        key: "outstandingPayment",
        display: `${outstandingPayment}`,
      },
    ];
  }, [referralCount, totalPayable, totalPaidOut, outstandingPayment]);

  return (
    <Card containerProps={{ px: 0, py: 0 }}>
      <Grid
        px={space.xxs}
        py={space.xxxs}
        gridTemplateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)"]}
        gridGap={space.xxs}
      >
        {columns.map(({ title, key, display }, index) => {
          return (
            <Flex
              key={key}
              flexDirection="column"
              gridGap={space.xxxs}
              py={space.xxxs}
              borderRight={[
                null,
                index < columns.length - 1 ? `1px solid ${borders.main}` : null,
              ]}
            >
              {props[key] === undefined ? (
                <Shimmer w="100%" h="100%" />
              ) : (
                <>
                  <Text textStyle="label" color={colors.slate}>
                    {title}
                  </Text>
                  <Text fontSize="2.4rem" fontWeight="400">
                    {display}
                  </Text>
                </>
              )}
            </Flex>
          );
        })}
      </Grid>
    </Card>
  );
}
