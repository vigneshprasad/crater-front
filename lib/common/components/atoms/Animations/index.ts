import Burn from "./Burn";
import Earn from "./Earn";
import Stream from "./Stream";
import Watch from "./Watch";

const LottieAnimations = {
  Burn,
  Watch,
  Earn,
  Stream,
};

export type ILottieAnimations = keyof typeof LottieAnimations;

export default LottieAnimations;
