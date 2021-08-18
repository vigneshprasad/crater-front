import styled from "styled-components";

import { Box, BoxProps, Link } from "@/common/components/atoms";
import { theme } from "@/common/theme";
import { Speaker } from "@/creators/types/community";

const { colors, radii } = theme;

interface IProps {
  roomId: number;
  speakers?: Speaker[];
}

const CHAIR_POSITION_MAP: BoxProps[] = [
  {
    top: 32,
    transform: "translate(-50%, 0)",
  },
  {
    bottom: 32,
    transform: "translate(-50%, 0)",
  },
  {
    right: 0,
    top: 32,
    transform: "translate(50%, 0)",
  },
  {
    right: 0,
    bottom: 32,
    transform: "translate(50%, 0)",
  },
  {
    top: 0,
    transform: "translate(50%, -50%)",
  },
];

const StyledBox = styled(Box)<BoxProps>`
  position: relative;
  height: 240px;
  width: 280px;
  background: ${(props) => props.theme.colors.black[3]};
  border-radius: ${(props) => props.theme.radii.s};
  transition: all 300ms ease-in;
  cursor: pointer;

  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

const Table: React.FC<IProps> = ({ speakers = [], roomId }) => {
  return (
    <Link href={`/community/rooms/audio/${roomId}`}>
      <StyledBox>
        {speakers.map((speaker, index) => (
          <Box
            key={speaker.pk}
            backgroundImage={`url(${speaker.photo})`}
            backgroundSize="cover"
            borderRadius={radii.s}
            position="absolute"
            bg={colors.black[2]}
            h={72}
            w={72}
            {...CHAIR_POSITION_MAP[index]}
          />
        ))}
      </StyledBox>
    </Link>
  );
};

export default Table;
