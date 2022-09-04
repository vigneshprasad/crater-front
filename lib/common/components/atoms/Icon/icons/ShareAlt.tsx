export default function ShareAlt(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 .5v4c-8 0-10 4.1-10 10 1.04-3.96 4-6 8-6h2v4l6-6.32L10 .5z"
        fill="#fff"
      />
    </svg>
  );
}
