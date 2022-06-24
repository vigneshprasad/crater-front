export default function QuestionMark(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 13.667A6.666 6.666 0 117 .334a6.666 6.666 0 010 13.333zm-.667-4.666v1.333h1.333V9.001H6.333zm1.333-1.097A2.335 2.335 0 007 3.334a2.334 2.334 0 00-2.288 1.875l1.308.262a1 1 0 11.98 1.196.667.667 0 00-.666.667v1h1.333v-.43z"
        fill="currentColor"
      />
    </svg>
  );
}
