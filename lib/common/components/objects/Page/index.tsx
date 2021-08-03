import { NextSeo, NextSeoProps } from "next-seo";

import { Box } from "../../atoms";

interface IProps {
  seo: NextSeoProps;
}

const Page: React.FC<IProps> = ({ seo, children }) => {
  return (
    <>
      <NextSeo {...seo} />
      <Box minHeight="100vh">{children}</Box>
    </>
  );
};

export default Page;
