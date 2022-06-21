export default function Calendar(
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
        d="M2.001 10.999h20v9a1 1 0 01-1 1h-18a1 1 0 01-1-1v-9zm15-8h4a1 1 0 011 1v5h-20v-5a1 1 0 011-1h4v-2h2v2h6v-2h2v2z"
        fill="currentColor"
      />
    </svg>
  );
}
