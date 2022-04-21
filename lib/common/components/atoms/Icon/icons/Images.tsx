export default function Images(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.71 21.25H8.48c-1.4 0-2.54-1.14-2.54-2.54V8.48c0-1.4 1.14-2.54 2.54-2.54h10.23c1.4 0 2.54 1.14 2.54 2.54v10.23c0 1.4-1.14 2.54-2.54 2.54z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.49 17.32a2.54 2.54 0 01-.74-1.8V5.29c0-1.4 1.14-2.54 2.54-2.54h10.23c.79 0 1.5.36 1.97.93M5.94 18.1l2.93-2.93c.5-.5 1.31-.5 1.8 0l.75.75c.5.5 1.31.5 1.8 0l3.3-3.3c.5-.5 1.31-.5 1.8 0l2.93 2.93"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.41 8.42c-.77 0-1.39.62-1.39 1.39 0 .77.62 1.39 1.39 1.39.77 0 1.39-.62 1.39-1.39 0-.77-.63-1.39-1.39-1.39z"
        fill="currentColor"
      />
    </svg>
  );
}
