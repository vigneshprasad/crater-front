export default function AlertCircle(
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
        d="M12.333 20.667a8.333 8.333 0 110-16.667 8.333 8.333 0 010 16.667zm-.833-5.834V16.5h1.667v-1.667H11.5zm0-6.666v5h1.667v-5H11.5z"
        fill="currentColor"
      />
    </svg>
  );
}
