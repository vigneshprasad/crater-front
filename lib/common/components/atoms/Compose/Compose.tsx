import { ComponentType } from "react";

type ProviderComponent =
  | ComponentType
  | [ComponentType, { [key: string]: unknown }];

export interface IComposeProps {
  providers: ProviderComponent[];
}

export const Compose = ({ providers, children }: IComposeProps) => {
  return (
    <>
      {providers.reduceRight((acc, curr) => {
        const [Comp, props] = Array.isArray(curr)
          ? [curr[0], curr[1]]
          : [curr, {}];
        return <Comp {...props}>{acc}</Comp>;
      }, children)}
    </>
  );
};
