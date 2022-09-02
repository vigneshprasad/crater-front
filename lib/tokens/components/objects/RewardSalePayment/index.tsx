import { useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";

import { Box, Flex, Icon, Text } from "@/common/components/atoms";
import { Button, IconButton } from "@/common/components/atoms/v2";

const StyledBox = styled(Box)`
  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    border: 4px solid #373737;
  }
`;

enum RewardSalePaymentFlow {
  SaleItemDisplay,
  PurchaseRequest,
  PurchaseSuccess,
}

const RewardSalePaymentSteps = [
  RewardSalePaymentFlow.SaleItemDisplay,
  RewardSalePaymentFlow.PurchaseRequest,
  RewardSalePaymentFlow.PurchaseSuccess,
];

export default function RewardSalePayment(): JSX.Element {
  const { space, colors, radii } = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [infoSheet, setInfoSheet] = useState(false);

  const pages = useMemo<
    {
      key: number;
      display?: JSX.Element;
    }[]
  >(() => {
    return [
      {
        key: RewardSalePaymentFlow.SaleItemDisplay,
        display: (
          <Box py={20} pl={space.xs} pr={24}>
            {/* <SaleItemInfo creator="Sanjeev Raichur" buyers={5} stockLeft={2} /> */}
          </Box>
        ),
      },
      {
        key: RewardSalePaymentFlow.PurchaseRequest,
        display: (
          <Box
            mt={space.xxs}
            w="100%"
            h="40%"
            bg={colors.primaryLight}
            borderTop={`1px solid ${colors.primaryLight}`}
            borderRadius="12px 12px 0px 0px"
            position="absolute"
            bottom={0}
          />
        ),
      },
      {
        key: RewardSalePaymentFlow.PurchaseSuccess,
        display: <Text>Purchase Success</Text>,
      },
    ];
  }, [space, colors]);

  return (
    <Flex flexDirection="column">
      <Box pt={space.xxxxs} pl={space.xs} pr={24}>
        <Box
          p={space.xxxs}
          bg={colors.primaryDark}
          border={`1px dashed ${colors.primaryLight}`}
          borderRadius={radii.xxxxs}
        >
          <Flex
            gridGap={space.xxxxxs}
            justifyContent="center"
            alignItems="center"
          >
            <Text textStyle="small" fontWeight={700}>
              Watch Web3 streams to get LEARN tokens and unlock discounts
            </Text>
            <Icon icon="LearnToken" size={14} />
          </Flex>
        </Box>

        <Flex pt={space.xxs} justifyContent="space-between" alignItems="center">
          <IconButton icon="Share" />
          <Flex gridGap={space.xxxxxs} alignItems="center">
            <Text>Pay using</Text>
            {/* <Select /> */}
          </Flex>
        </Flex>

        <Box pt={28}>
          <Flex pb={space.xxxs} gridGap={24}>
            <Box
              w={115}
              h={115}
              bg={colors.primaryLight}
              borderRadius={radii.xxs}
            />
            <Text pt={space.xxxxs} textStyle="formLabel">
              Ape illustration - Gold Version
            </Text>
          </Flex>
          <Flex
            px={space.xxxs}
            py={space.xxxxxs}
            justifyContent="space-between"
            alignItems="center"
            bg={colors.primaryDark}
            border={`1px solid ${colors.primaryLight}`}
            borderRadius={radii.xxxxs}
          >
            <Text textStyle="small" fontWeight={600}>
              More Information
            </Text>
            {infoSheet ? (
              <IconButton
                icon="ChevronUp"
                iconProps={{ size: 18 }}
                onClick={() => setInfoSheet(false)}
              />
            ) : (
              <IconButton
                icon="ChevronDown"
                iconProps={{ size: 18 }}
                onClick={() => setInfoSheet(true)}
              />
            )}
          </Flex>
          {infoSheet && (
            <StyledBox
              p={space.xxxs}
              maxHeight={200}
              overflowY="auto"
              borderWidth="0px 1px 1px 1px"
              borderStyle="solid"
              borderColor={colors.primaryLight}
              borderRadius="0px 0px 4px 4px"
            >
              <Text textStyle="body" fontWeight={500} lineHeight="2.1rem">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                eget placerat enim. Fusce tempor neque ac purus hendrerit,
                posuere ultrices dui scelerisque. Integer nec pellentesque erat,
                et scelerisque urna. Etiam a massa quis nulla ornare tristique.
                Aliquam pulvinar, velit id accumsan imperdiet, augue ipsum
                varius metus, vitae consequat orci nibh eu magna. Fusce iaculis
                turpis a leo dictum, et viverra magna rhoncus. Vivamus
                pellentesque non orci ut tempus. Nam gravida faucibus tortor, et
                ornare urna elementum eu. Vivamus lacus tellus, hendrerit ac
                ligula sit amet, porttitor tempus arcu. Morbi dignissim erat
                eros, eu pulvinar mauris luctus eu. Curabitur pellentesque justo
                vel nibh imperdiet vulputate. Mauris non laoreet nisl. Donec
                elementum et nisl nec consectetur
              </Text>
            </StyledBox>
          )}
        </Box>
      </Box>

      {pages.map(
        ({ key, display }) =>
          RewardSalePaymentSteps[currentPage] === key && (
            <Box key={key}>{display}</Box>
          )
      )}

      {currentPage === RewardSalePaymentFlow.SaleItemDisplay && (
        <Box
          w="100%"
          py={28}
          px={space.xs}
          bg={colors.primaryDark}
          position="absolute"
          bottom={0}
          borderTop={`1px solid ${colors.primaryLight}`}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Text
                pb={space.xxxxxs}
                textStyle="small"
                fontWeight={600}
                color={colors.textQuartenary}
              >
                PRICE
              </Text>
              <Text textStyle="formLabel">₹120</Text>
            </Box>
            <Button
              w={280}
              minHeight={44}
              label="Buy Now 🎉"
              textProps={{ fontSize: "1.6rem" }}
              onClick={() => setCurrentPage((page) => page + 1)}
            />
          </Flex>
        </Box>
      )}
    </Flex>
  );
}
