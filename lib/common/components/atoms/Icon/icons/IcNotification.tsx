export default function IcNotification(
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
        d="M20.22 16.62c0 .85-.69 1.54-1.54 1.54H5.32a1.54 1.54 0 010-3.08h.51V9.94c0-3.4 2.76-6.17 6.17-6.17 1.7 0 3.24.69 4.36 1.81a6.11 6.11 0 011.81 4.36v5.14h.51c.85 0 1.54.69 1.54 1.54zM12 3.78V2.75M15.08 18.17c0 1.71-1.38 3.08-3.08 3.08-1.7 0-3.08-1.38-3.08-3.08h6.16z"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
