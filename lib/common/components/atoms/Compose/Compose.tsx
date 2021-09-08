import { ComponentType, PropsWithChildren } from "react";

type ProviderComponent =
  | ComponentType
  | [ComponentType, { [key: string]: unknown }];

export type IComposeProps = PropsWithChildren<{
  providers: ProviderComponent[];
}>;

export function Compose({ providers, children }: IComposeProps): JSX.Element {
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
}
