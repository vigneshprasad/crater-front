export default function Page(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.571.57H3.238c-.971 0-1.143.214-1.143 1.143v12.19c0 .95.21 1.143 1.143 1.143h9.143c.952 0 1.143-.178 1.143-1.142V5.523H8.57V.57zm4.953 3.81L9.714.57v3.81h3.81z"
        fill="#fff"
      />
    </svg>
  );
}
