import { Grid } from "../../atoms";
import { Icon } from "../../atoms/Icon";

export type ILogoProps = {
  withText?: boolean;
};

export const Logo: React.FC<ILogoProps> = ({ withText = false }) => {
  return (
    <Grid>
      <Icon size={48} icon="Logo" />
      {withText && <p>Crater.Club</p>}
    </Grid>
  );
};
