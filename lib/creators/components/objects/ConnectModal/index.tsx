import { useTheme } from "styled-components";

import { Grid, Text, Icon, Link } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import ModalWithVideo from "@/common/components/objects/ModalWithVideo";

interface IProps {
  name?: string;
  visible: boolean;
  onClose: () => void;
}

export default function ConnectModal({
  visible,
  name,
  onClose,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();

  const text = `
    While you wait you
    can network with other like minds that are going to be tuning in
    using the mobile app.
  `;
  return (
    <ModalWithVideo visible={visible} onClose={onClose}>
      <Text textStyle="headline5">
        {name} is getting ready to stream live to you!
      </Text>

      <Text my={space.xs} color={colors.white[1]}>
        {text}
      </Text>

      <Text textStyle="caption" mb={space.xxs}>
        Make Some Noise?
      </Text>

      <Grid
        mt={space.xs}
        gridTemplateColumns="1fr 1fr"
        alignItems="start"
        gridGap={space.xs}
      >
        <Link passHref href="//google.com" boxProps={{ target: "_blank" }}>
          <Button
            variant="full-width"
            bg={colors.black[5]}
            border="1px solid rgba(255, 255, 255, 0.1)"
            prefixElement={
              <Icon size={20} icon="Linkedin" fill color={colors.white[0]} />
            }
            text="Share"
          />
        </Link>
        <Link passHref href="//google.com" boxProps={{ target: "_blank" }}>
          <Button
            variant="full-width"
            border="1px solid rgba(255, 255, 255, 0.1)"
            bg={colors.black[5]}
            prefixElement={
              <Icon size={20} icon="Twitter" fill color={colors.white[0]} />
            }
            text="Tweet"
          />
        </Link>
      </Grid>
    </ModalWithVideo>
  );
}
