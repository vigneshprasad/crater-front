export default function Pause(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.125 19V5H19v14h-5.875zM5 19V5h5.875v14H5z"
        fill="currentColor"
      />
    </svg>
  );
}
