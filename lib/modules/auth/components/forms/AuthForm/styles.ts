import styled from "styled-components";

export const RootWrapper = styled.div`
  display: grid;
  min-width: 420px;

  & > h4 {
    ${(props) => props.theme.textThemes.headline4}
    margin: 48px 0;
  }
`;

export const FormWrapper = styled.form`
  display: grid;
  grid-row-gap: ${(props) => props.theme.margins.lg};
`;
