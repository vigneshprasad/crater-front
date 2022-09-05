export default function Phone(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.999 8.807L8.486 8.4l-1.68 1.68a10.03 10.03 0 01-4.394-4.393L4.1 4 3.692.5H.02c-.387 6.787 5.193 12.367 11.98 11.98V8.807z"
        fill="#fff"
      />
    </svg>
  );
}
