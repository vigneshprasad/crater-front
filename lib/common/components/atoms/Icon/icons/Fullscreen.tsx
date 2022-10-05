export default function Fullscreen(
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
        d="M5 19v-4.825h1.5V17.5h3.325V19H5zm0-9.175V5h4.825v1.5H6.5v3.325H5zM14.175 19v-1.5H17.5v-3.325H19V19h-4.825zM17.5 9.825V6.5h-3.325V5H19v4.825h-1.5z"
        fill="currentColor"
      />
    </svg>
  );
}
