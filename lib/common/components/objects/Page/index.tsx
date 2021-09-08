import { NextSeo, NextSeoProps } from "next-seo";
import { PropsWithChildren } from "react";

type IProps = PropsWithChildren<{
  seo: NextSeoProps;
}>;

export default function Page({ seo, children }: IProps): JSX.Element {
  return (
    <>
      <NextSeo {...seo} />
      {children}
    </>
  );
}
