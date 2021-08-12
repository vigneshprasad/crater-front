import { ReactNode } from "react";

import { Grid } from "../../atoms";

interface Props {
  children: {
    navbar?: ReactNode;
    tabContent?: ReactNode;
  };
}

const HomePageLayout: React.FC<Props> = ({ children }) => {
  const { navbar, tabContent } = children;
  return (
    <Grid minHeight="100vh" gridTemplateColumns={["96px 1fr"]} as="main">
      {navbar}
      {tabContent}
    </Grid>
  );
};

export default HomePageLayout;
