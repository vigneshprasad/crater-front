import { NextSeo, NextSeoProps } from "next-seo";

interface IProps {
  seo: NextSeoProps;
}

const Page: React.FC<IProps> = ({ seo, children }) => {
  return (
    <>
      <NextSeo {...seo} />
      {children}
    </>
  );
};

export default Page;
