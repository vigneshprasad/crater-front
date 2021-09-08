import { Grid } from "@/common/components/atoms";

const AudioRoomLayout = ({ children }) => {
  return (
    <Grid h="100vh" gridTemplateRows="min-content 1fr" overflow="hidden">
      {children}
    </Grid>
  );
};

export default AudioRoomLayout;
