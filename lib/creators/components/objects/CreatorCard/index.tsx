import styled from "styled-components";

import { Flex, Box, FlexProps, Text } from "@/common/components/atoms";

type Props = {
  image: string;
};

const Container = styled(Flex)<FlexProps & { image: string }>`
  position: relative;
  border: 2px solid ${({ theme }) => theme.borders.main};
  border-radius: 72px;
  min-width: 200px;
  min-height: 260px;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0)
    ),
    url(${({ image }) => image});
  background-size: cover;
  background-position: top center;
  transition: all 400ms ease-in-out;

  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

const CreatorCard: React.FC<Props> = ({ image }) => {
  return (
    <Container mx={[16]} image={image}>
      <Text mx={[16]} my={[24]} textStyle="headline5">
        Elon Musk
      </Text>
      <Box
        borderRadius={[12]}
        py={[4]}
        px={[8]}
        border={["1px solid rgba(288, 288, 288, 0.4)"]}
        background="#1B1D21"
        position="absolute"
        transform="translate(0,50%)"
      >
        <Text fontSize={["1.rem"]} fontWeight="600">
          1,045.00 INR
        </Text>
      </Box>
    </Container>
  );
};

export default CreatorCard;
