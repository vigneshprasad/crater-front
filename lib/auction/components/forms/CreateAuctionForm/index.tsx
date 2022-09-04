import { useTheme } from "styled-components";

import { Box, Flex, Form, Span, Text } from "@/common/components/atoms";
import { Button, Input } from "@/common/components/atoms/v2";
import ImageDropBox from "@/common/components/objects/ImageDropBox/v2";

export default function CreateAuctionForm(): JSX.Element {
  const { space, colors } = useTheme();
  return (
    <Form display="grid" gridTemplateRows="max-content 1fr">
      <Box overflowY="auto">
        <Flex
          py={space.xxxs}
          flexDirection="column"
          gridGap={space.xxs}
          px={space.xxxxs}
          overflowY="auto"
        >
          <Input label="Title" maxLength={80} placeholder="Item Name" />
          <Input
            maxLength={150}
            placeholder="Description of item"
            label={
              <>
                <>DESCRIPTION </>
                <Span
                  fontSize="1rem"
                  color={colors.textPlaceholder}
                  textTransform="capitalize"
                >
                  (Optional)
                </Span>
              </>
            }
          />
          <Input
            label="Minimum Bid Price"
            placeholder="Price"
            prefixElement={
              <Flex
                h="100%"
                w={44}
                bg={colors.secondaryLight}
                alignItems="center"
                justifyContent="center"
                borderRadius="4px 0 0 4px"
              >
                <Text fontSize="1.4rem">INR</Text>
              </Flex>
            }
          />
          <ImageDropBox
            label={
              <>
                <>Upload Image </>
                <Span
                  fontSize="1rem"
                  color={colors.textPlaceholder}
                  textTransform="capitalize"
                >
                  (Optional)
                </Span>
              </>
            }
          />
        </Flex>
      </Box>

      <Box
        bg={colors.primaryBackground}
        border={`1px solid ${colors.primaryLight}`}
        px={space.xxxxs}
        py={space.xxxs}
      >
        <Button w="100%" label="Launch Sale" />
      </Box>
    </Form>
  );
}
