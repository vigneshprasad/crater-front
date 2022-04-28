import { useTheme } from "styled-components";

import { Grid, Image, Text } from "@/common/components/atoms";

interface IProps {
  imageSize?: number;
}

export default function ReferralStepsStatic({
  imageSize = 50,
}: IProps): JSX.Element {
  const { space } = useTheme();

  const steps = [
    {
      text: "Share the referral link with your friends",
      image: "/images/img_journey_planet_1.png",
    },
    {
      text: "Your friend uses the link to sign up & watch their first stream",
      image: "/images/img_journey_planet_2.png",
    },
    {
      text: "You get ₹50 and your friend gets ₹50 after they watch their first 20 minutes of live content",
      image: "/images/img_journey_planet_3.png",
    },
    {
      text: "Withdraw the money or use it at the auctions",
      image: "/images/img_journey_planet_4.png",
    },
  ];

  return (
    <Grid gridAutoFlow="row" gridGap={[space.xs, space.xxs]}>
      {steps.map((step, index) => (
        <Grid
          gridAutoFlow="column"
          gridTemplateColumns="max-content 1fr"
          gridGap={space.xxs}
          alignItems="center"
          key={index}
        >
          <Image
            src={step.image}
            alt={`${index + 1}`}
            boxProps={{ w: imageSize }}
          />
          <Text>{step.text}</Text>
        </Grid>
      ))}
    </Grid>
  );
}
