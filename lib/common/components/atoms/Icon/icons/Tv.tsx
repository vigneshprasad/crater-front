export default function Tv(props: React.SVGProps<SVGSVGElement>): JSX.Element {
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
      className="tv_svg__feather tv_svg__feather-tv"
      {...props}
    >
      <rect x={2} y={7} width={20} height={15} rx={2} ry={2} />
      <path d="M17 2l-5 5-5-5" />
    </svg>
  );
}
