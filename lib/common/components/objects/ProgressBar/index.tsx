import styled from "styled-components";

import { Box } from "../../atoms";

type IProps = {
  percent: number;
};

const Container = styled(Box)`
  height: 6px;
  width: 100%;
  margin: auto 0;
  position: relative;
`;

const BaseBox = styled(Box)`
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 3px;
  transition: width 10s ease-in-out;
`;

const Background = styled(BaseBox)`
  background: ${({ theme }) => theme.colors.black[6]};
  width: 100%;
`;

const Progress = styled(BaseBox)`
  background: #8884d8;
  width: ${({ percent }) => percent}%;
`;

export default function ProgressBar({ percent }: IProps): JSX.Element {
  return (
    <Container>
      <Background />
      <Progress percent={percent} />
    </Container>
  );
}
