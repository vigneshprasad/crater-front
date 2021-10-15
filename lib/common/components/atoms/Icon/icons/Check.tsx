export default function Check(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="check_svg__feather check_svg__feather-check"
      {...props}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
