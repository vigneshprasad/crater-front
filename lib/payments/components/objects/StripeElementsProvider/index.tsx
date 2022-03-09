import { Elements } from "@stripe/react-stripe-js";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import getStripe from "@/payments/utils/getStripe";

type IProps = PropsWithChildren<{
  publishKey: string;
  clientSecret: string;
}>;

export default function StripeElementsProvider({
  publishKey,
  clientSecret,
  children,
}: IProps): JSX.Element {
  const { space, fonts, colors } = useTheme();
  return (
    <Elements
      stripe={getStripe(publishKey)}
      options={{
        clientSecret: clientSecret,
        appearance: {
          theme: "night",
          variables: {
            fontFamily: fonts.body,
            colorBackground: colors.black[4],
            focusOutline: `2px solid ${colors.accent}`,
          },
          rules: {
            ".Label": {
              fontSize: "16px",
              fontWeight: "600",
              margin: `${space.xxs}px 0`,
              lineHeight: "18px",
            },
          },
        },
      }}
    >
      {children}
    </Elements>
  );
}
