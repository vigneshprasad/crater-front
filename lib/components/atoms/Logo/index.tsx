import Svg from "public/svg";

import { Container, LogoLabel } from "./styles";

interface IProps {
  withLabel?: boolean;
}

const Logo: React.FC<IProps> = ({ withLabel = false }) => (
  <Container>
    <Svg.Logo width="48px" height="48px" viewBox="0 0 40 40" />
    {withLabel && <LogoLabel>Crater.Club</LogoLabel>}
  </Container>
);

export default Logo;
