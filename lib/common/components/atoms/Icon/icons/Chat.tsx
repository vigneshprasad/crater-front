export default function Chat(
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
        d="M19.125 2.25H4.875A3.379 3.379 0 001.5 5.625v9A3.379 3.379 0 004.875 18H6v3a.75.75 0 001.23.576L11.52 18h7.605a3.379 3.379 0 003.375-3.375v-9a3.379 3.379 0 00-3.375-3.375zM7.5 11.625a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4.5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4.5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
        fill="currentColor"
      />
    </svg>
  );
}
