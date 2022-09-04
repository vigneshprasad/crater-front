import { SyntheticEvent } from "react";
import { useTheme } from "styled-components";

import SaleApiClient, {
  CreateRewardSaleArgs,
} from "@/auction/api/SaleApiClient";
import { Box, Flex, Form, Span, Text } from "@/common/components/atoms";
import { Button, Input } from "@/common/components/atoms/v2";
import ImageDropBox from "@/common/components/objects/ImageDropBox/v2";
import QuantityInput from "@/common/components/objects/QuantityInput";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import toBase64 from "@/common/utils/image/toBase64";

type CreatSaleFormArgs = {
  title: string;
  description?: string;
  price: number;
  quantity: number;
  photo?: File;
};

export default function CreateSaleForm(): JSX.Element {
  const { fields, fieldValueSetter, getValidatedData } =
    useForm<CreatSaleFormArgs>({
      fields: {
        title: {
          intialValue: "",
          validators: [
            {
              validator: Validators.required,
              message: "Please enter a name",
            },
          ],
        },
        description: {
          intialValue: "",
          validators: [],
        },
        price: {
          intialValue: 50,
          validators: [
            {
              validator: Validators.required,
              message: "Please enter a price",
            },
          ],
        },
        quantity: {
          intialValue: 50,
          validators: [
            {
              validator: Validators.required,
              message: "Please enter a price",
            },
          ],
        },
        photo: {
          intialValue: undefined,
          validators: [],
        },
      },
    });
  const { space, colors } = useTheme();

  const handleFormSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    const data = getValidatedData();
    if (data) {
      const updated: CreateRewardSaleArgs = {
        ...data,
        photo: data.photo ? await toBase64(data.photo) : undefined,
      };

      const [res] = await SaleApiClient().postRewardSale(updated);

      console.log(res);
    }
  };

  return (
    <Form
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="grid"
      gridTemplateRows="1fr max-content"
      onSubmit={handleFormSubmit}
    >
      <Box overflowY="auto">
        <Flex
          py={space.xxxs}
          flexDirection="column"
          gridGap={space.xxs}
          px={space.xxxxs}
          overflowY="auto"
        >
          <Input
            value={fields.title.value}
            label="Title"
            maxLength={80}
            placeholder="Item Name"
            onChange={(e) => fieldValueSetter("title", e.currentTarget.value)}
            error={fields.title.errors?.[0]}
          />
          <Input
            maxLength={150}
            placeholder="Description of item"
            value={fields.description.value}
            error={fields.description.errors?.[0]}
            onChange={(e) =>
              fieldValueSetter("description", e.currentTarget.value)
            }
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
          <Flex gridGap={space.xxxxs}>
            <Input
              type="number"
              flex={1}
              label="Price"
              placeholder="Price"
              value={fields.price.value}
              onChange={(e) => fieldValueSetter("price", e.currentTarget.value)}
              error={fields.price.errors?.[0]}
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
            <QuantityInput label="Quantity" />
          </Flex>

          <ImageDropBox
            value={fields.photo.value}
            onChange={(file) => fieldValueSetter("photo", file)}
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
