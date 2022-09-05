export default function Statistics(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 12.5H.333v-8H4v8zM8.833.5H5.167v12h3.666V.5zm4.834 5.333H10V12.5h3.667V5.833z"
        fill="#EDEDED"
      />
    </svg>
  );
}
