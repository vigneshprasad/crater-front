import { useTheme } from "styled-components";

import { Form } from "@/common/components/atoms";
import { Button, Input } from "@/common/components/atoms/v2";
import { PhoneInput } from "@/common/components/objects/PhoneInput/v2";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

export default function LandingAuthForm(): JSX.Element | null {
  const { space, breakpoints } = useTheme();

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  if (isMobile === undefined) return null;

  return (
    <Form
      as="form"
      display="grid"
      gridAutoFlow="row"
      gridAutoRows="min-content"
      gridGap={space.xs}
      maxWidth={332}
    >
      <Input label={isMobile ? undefined : "Name"} placeholder="Name" />

      <PhoneInput placeholder="Phone Number" />

      <Button mt={space.xxs} label="Get Started" w="100%" h={44} />
    </Form>
  );
}
