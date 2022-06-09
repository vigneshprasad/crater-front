export default function CameraLive(
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
        d="M17.998 7.001a2 2 0 00-2-2h-12a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2v-3.333l4 3.333v-10l-4 3.333V7.001zm-4 6h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
        fill="currentColor"
      />
    </svg>
  );
}
