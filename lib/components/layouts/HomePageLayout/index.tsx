import { BaseWrapper } from "lib/styles/base.styled";

import { GridLayout } from "./styles";

const HomePageLayout: React.FC = ({ children }) => (
  <BaseWrapper>
    <GridLayout>{children}</GridLayout>
  </BaseWrapper>
);

export default HomePageLayout;
