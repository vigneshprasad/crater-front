import { NextSeo, NextSeoProps } from "next-seo";
import { SWRConfig } from "swr";

import fetcher from "@/common/utils/fetcher";

interface IProps {
  seo: NextSeoProps;
}

const Page: React.FC<IProps> = ({ seo, children }) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher,
      }}
    >
      <NextSeo {...seo} />
      {children}
    </SWRConfig>
  );
};

export default Page;
