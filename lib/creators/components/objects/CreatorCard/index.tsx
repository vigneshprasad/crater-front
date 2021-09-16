import { PropsWithChildren } from "react";
import styled from "styled-components";

import { Flex, Box, FlexProps, Text, Link } from "@/common/components/atoms";

type Props = PropsWithChildren<{
  id: number;
  image?: string;
  name?: string;
}>;

const Container = styled(Flex)<FlexProps & { image?: string }>`
  position: relative;
  border-radius: 100px;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.7),
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

export default function CreatorCard({ id, image, name }: Props): JSX.Element {
  return (
    <Link href={`/creator/${id}`}>
      <Container h="100%" px={[20]} image={image}>
        <Text textAlign="center" mx={[16]} my={[24]} textStyle="headline5">
          {name}
        </Text>
        <Text>{name}</Text>

        <Box
          borderRadius={[12]}
          py={[4]}
          px={[8]}
          border={["1px solid rgba(288, 288, 288, 0.4)"]}
          background="#1B1D21"
          position="absolute"
          transform="translate(0,50%)"
        >
          <Text textAlign="center" fontSize={["1.rem"]} fontWeight="600">
            1,045.00 INR
          </Text>
        </Box>
      </Container>
    </Link>
  );
}
