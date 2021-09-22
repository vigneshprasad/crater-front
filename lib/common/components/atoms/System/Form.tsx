import styled from "styled-components";
import { grid, GridProps } from "styled-system";

import { Box, BaseBoxProps } from "./Box";

export type FormProps = BaseBoxProps &
  GridProps &
  React.FormHTMLAttributes<HTMLFormElement> & {
    as?: "form";
  };

export const Form = styled(Box)<FormProps>`
  ${grid}
`;

Form.defaultProps = {
  as: "form",
};
