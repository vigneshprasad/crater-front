import { Box, Text } from "@/common/components/atoms";
import BottomSheet from "@/common/components/atoms/BottomSheet";

interface IProps {
  visible: boolean;
}

export default function BasicSignupSheet({ visible }: IProps): JSX.Element {
  return (
    <BottomSheet
      visible={visible}
      onClose={() => {
        console.log("Heloo");
      }}
    >
      <Box>
        <Text textStyle="headline5" maxWidth="60%">
          Hey, please provide some basic information
        </Text>
      </Box>
    </BottomSheet>
  );
}
