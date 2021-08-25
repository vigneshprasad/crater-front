import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Flex, Text } from "@/common/components/atoms";

type IProps = {
  photo?: string;
  size?: number;
  isHost?: boolean;
  name: string;
};

const SpeakerItem: React.FC<IProps> = ({
  photo,
  size = 72,
  isHost = false,
  name,
}) => {
  const { radii, borders, space } = useTheme();
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      border={`2px solid ${borders.main}`}
      borderRadius={[radii.s]}
    >
      <Box
        overflow="hidden"
        position="relative"
        h={size}
        w={size}
        borderRadius="50%"
        mb={[space.xs]}
      >
        {photo && <Image layout="fill" src={photo} alt={name} />}
      </Box>
      <Text>{name}</Text>
      {isHost && <Text>Host</Text>}
    </Flex>
  );
};

export default SpeakerItem;
