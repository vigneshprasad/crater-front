import { FormHTMLAttributes } from "react";
import styled from "styled-components";
import { grid, GridProps } from "styled-system";

import { Box, BaseBoxProps } from "./Box";

export type FormProps = BaseBoxProps &
  GridProps &
  FormHTMLAttributes<HTMLFormElement> & {
    as?: "form";
  };

export const Form = styled(Box)<FormProps>`
  ${grid}
`;

Form.defaultProps = {
  as: "form",
};
