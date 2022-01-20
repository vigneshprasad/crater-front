import styled from "styled-components";

import { Text, TextProps } from "../System/Text";

type ICheckboxProps = React.HTMLAttributes<HTMLInputElement> & {
  labelProps?: TextProps;
  checked?: boolean;
};

const StyledCheckBox = styled.input`
  -webkit-appearance: none;
  appearance: none;
  /* For iOS < 15 to remove gradient background */
  background-color: transparent;
  /* Not removed via appearance */
  margin: 0;
  font: inherit;
  color: ${({ theme }) => theme.colors.accent};
  width: 1.4em;
  height: 1.4em;
  border: 0.25em solid currentColor;
  border-radius: 0.2em;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;

  &:checked {
    background: ${({ theme }) => theme.colors.accent};
  }

  &::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #fff;
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  &:checked::before {
    transform: scale(1);
  }
`;

export function Checkbox({
  labelProps,
  children,
  ...rest
}: ICheckboxProps): JSX.Element {
  return (
    <Text
      as="label"
      display="grid"
      gridTemplateColumns="max-content 1fr"
      alignItems="center"
      gridGap={8}
      textStyle="label"
      {...labelProps}
    >
      <StyledCheckBox type="checkbox" {...rest} />
      {children}
    </Text>
  );
}
