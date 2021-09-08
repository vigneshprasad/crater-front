import { ReactNode } from "react";

import { Grid } from "../../atoms";

interface Props {
  children: {
    navbar?: ReactNode;
    tabContent?: ReactNode;
  };
}

const HomePageLayout = ({ children }: Props) => {
  const { navbar, tabContent } = children;
  return (
    <Grid h="100vh" gridTemplateColumns={["96px 1fr"]} as="main">
      {navbar}
      {tabContent}
    </Grid>
  );
};

export default HomePageLayout;
