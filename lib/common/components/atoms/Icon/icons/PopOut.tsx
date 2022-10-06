export default function PopOut(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 9.167v4a1.334 1.334 0 01-1.333 1.333H3.333A1.334 1.334 0 012 13.167V5.833A1.333 1.333 0 013.333 4.5h4M10 2.5h4v4M6.664 9.833L13.997 2.5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
