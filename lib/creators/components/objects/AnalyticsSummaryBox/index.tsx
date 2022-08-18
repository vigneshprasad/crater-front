import { useMemo } from "react";
import { useTheme } from "styled-components";

import {
  Card,
  Grid,
  Box,
  Text,
  Flex,
  Shimmer,
  CardProps,
} from "@/common/components/atoms";
import { ClubMembersGrowth } from "@/creators/types/creator";

interface IProps extends CardProps {
  clubMembersCount?: number;
  followerGrowth?: number;
  percentageUsersFromCrater?: number;
  comparativeEngagement?: number;
  averageEngagement?: number;
  clubMembersGrowth?: ClubMembersGrowth[];
}

type ValueKeys = keyof IProps;

export default function AnalyticsSummaryBox(props: IProps): JSX.Element {
  const {
    clubMembersCount,
    followerGrowth,
    percentageUsersFromCrater,
    comparativeEngagement,
    averageEngagement,
    clubMembersGrowth,
    ...rest
  } = props;

  const { space, colors, borders } = useTheme();

  const columns = useMemo<
    {
      title: string;
      key: ValueKeys;
      display: string;
    }[]
  >(() => {
    return [
      {
        title: "My Club",
        key: "clubMembersCount",
        display:
          clubMembersCount === null ? "-" : `${clubMembersCount} members`,
      },
      {
        title: "Growth this month",
        key: "followerGrowth",
        display: followerGrowth === null ? "-" : `${followerGrowth} %`,
      },
      {
        title: "Users brought in by Crater",
        key: "percentageUsersFromCrater",
        display:
          percentageUsersFromCrater === null
            ? "-"
            : `${percentageUsersFromCrater} %`,
      },
      {
        title: "Average Engagement",
        key: "averageEngagement",
        display:
          averageEngagement === null ? "-" : `${averageEngagement} Questions`,
      },
      {
        title: "Comparative Engagement",
        key: "comparativeEngagement",
        display:
          comparativeEngagement === null ? "-" : `${comparativeEngagement} %`,
      },
    ];
  }, [
    clubMembersCount,
    followerGrowth,
    percentageUsersFromCrater,
    comparativeEngagement,
    averageEngagement,
  ]);

  return (
    <Card containerProps={{ px: 0, py: 0 }} {...rest}>
      <Grid
        gridTemplateColumns="repeat(5, 1fr)"
        p={space.xs}
        gridGap={space.xxs}
      >
        {columns.map(({ title, key, display }, index) => {
          return (
            <Flex
              key={key}
              flexDirection="column"
              gridGap={space.xxxs}
              py={space.xxs}
              borderRight={
                index < columns.length - 1
                  ? `1px solid ${borders.main}`
                  : undefined
              }
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
