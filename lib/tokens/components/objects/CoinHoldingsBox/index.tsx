import STATIC_IMAGES from "public/images";
import { useState, useEffect, useCallback } from "react";
import styled, { useTheme, css } from "styled-components";

import {
  Box,
  Grid,
  Text,
  Span,
  Flex,
  FlexProps,
  Image,
  Link,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { PageRoutes } from "@/common/constants/route.constants";
import { CoinApiClient } from "@/tokens/api";
import { CoinPriceLog } from "@/tokens/types/auctions";
import { CoinHolding } from "@/tokens/types/exchange";

import CoinLogGraph from "../CoinLogGraph";

interface IProps {
  holdings?: CoinHolding[];
  loading: boolean;
}

const LogItemContainer = styled(Flex)<FlexProps & { active: boolean }>`
  ${({ active }) =>
    active &&
    css`
      background: ${({ theme }) => theme.colors.black[4]};
    `}

  &:hover {
    background: ${({ theme }) => theme.colors.black[4]};
  }
`;

export default function CoinHoldingsBox({ holdings }: IProps): JSX.Element {
  const [activeHolding, setActiveHolding] = useState<CoinHolding | undefined>(
    undefined
  );
  const { space, colors, borders, radii } = useTheme();
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<CoinPriceLog[] | undefined>(undefined);

  const fetchPriceLogs = useCallback(
    async (holding: CoinHolding) => {
      setLoading(true);
      const [logs, err] = await CoinApiClient().getCoinPriceLogs(holding.coin);
      setLoading(false);
      if (err || !logs) {
        setLogs(undefined);
        return;
      }

      setLogs(logs);
    },
    [setLoading, setLogs]
  );

  const onClickHolding = useCallback(
    (holding: CoinHolding) => {
      setActiveHolding(holding);
      fetchPriceLogs(holding);
    },
    [fetchPriceLogs, setActiveHolding]
  );

  // Initalize activeHolding to first item in holding
  useEffect(() => {
    if (holdings && holdings.length > 0) {
      if (!activeHolding) {
        setActiveHolding(holdings[0]);
        fetchPriceLogs(holdings[0]);
      }
    }
  }, [holdings, activeHolding, setActiveHolding, fetchPriceLogs]);

  console.log(holdings);

  if (holdings && holdings.length === 0) {
    return (
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={space.s}
        gridGap={space.xxs}
        border={`2px dashed ${borders.main}`}
        borderRadius={radii.xxs}
      >
        <Image src={STATIC_IMAGES.ImageEmptyWallet} alt="Hello" />
        <Text>You currently have no tokens.</Text>
        <Link href={PageRoutes.tokens()}>
          <Button text="Place a bid" />
        </Link>
      </Flex>
    );
  }

  return (
    <Grid gridTemplateColumns="minmax(320px, 1fr) 3fr" gridGap={space.xxs}>
      <Flex flexDirection="column" gridGap={space.xxxs}>
        {(() => {
          if (!holdings) {
            return <Box>Loading</Box>;
          }

          return holdings.map((holding) => {
            const { coin_detail: coin } = holding;
            const { creator_detail: creator } = coin;
            return (
              <LogItemContainer
                key={holding.id}
                py={space.xxs}
                px={space.xxs}
                cursor="pointer"
                active={activeHolding?.id === holding.id}
                onClick={() => onClickHolding(holding)}
              >
                <Flex flexDirection="column" gridGap={space.xxxs}>
                  <Text textStyle="headline6" color={colors.accent}>
                    {coin.display.symbol}{" "}
                    <Span fontWeight="500" color={colors.slate}>
                      {creator.profile_detail.name}
                    </Span>
                  </Text>
                  <Text>{holding.number_of_coins} Tokens</Text>
                </Flex>
              </LogItemContainer>
            );
          });
        })()}
      </Flex>
      <CoinLogGraph logs={logs} loading={loading} />
    </Grid>
  );
}
