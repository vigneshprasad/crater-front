import { AnimatedBox, AnimatedBoxProps } from "../Animated";

export default function Shimmer({ ...props }: AnimatedBoxProps): JSX.Element {
  return (
    <AnimatedBox
      animate={{ background: ["#353535", "#a8a8a8"] }}
      transition={{ flip: Infinity, duration: 1 }}
      {...props}
    />
  );
}
