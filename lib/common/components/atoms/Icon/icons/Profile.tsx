export default function Profile(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16 21H0v-2a5 5 0 015-5h6a5 5 0 015 5v2zm-8-9A6 6 0 118-.001 6 6 0 018 12z"
        fill="currentColor"
      />
    </svg>
  );
}
