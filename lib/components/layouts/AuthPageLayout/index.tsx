import Logo from "@components/atoms/Logo";

import { HeroContainer, SectionWrapper, FormContainer } from "./styles";

const AuthPageLayout: React.FC = ({ children }) => (
  <SectionWrapper>
    <HeroContainer>
      <Logo withLabel />
      <h4>Start trading your first Creator Coins.</h4>
    </HeroContainer>
    <FormContainer>{children}</FormContainer>
  </SectionWrapper>
);

export default AuthPageLayout;
