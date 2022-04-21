export default function Shuffle(
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
        d="M19.07 9.34l2.18-2.06-2.18-2.05M19.07 18.77l2.18-2.05-2.18-2.06"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.75 7.28h.64c1.64 0 3.18.81 4.11 2.15l3.55 5.12a4.988 4.988 0 004.11 2.15h5.73"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.75 16.72h.64c1.64 0 3.18-.81 4.11-2.15l3.55-5.12a4.988 4.988 0 014.11-2.15h5.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
