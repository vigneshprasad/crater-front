import TypewriterComponent from "typewriter-effect";

interface IProps {
  strings: string[];
}
export default function TypingText({ strings }: IProps): JSX.Element {
  return (
    <TypewriterComponent
      options={{
        strings,
        autoStart: true,
        loop: true,
      }}
    />
  );
}
