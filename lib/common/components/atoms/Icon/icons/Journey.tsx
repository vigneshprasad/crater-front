export default function Journey(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3 14.166a2.667 2.667 0 111.355-4.964l4.348-4.348a2.663 2.663 0 11.942.944l-4.347 4.347A2.667 2.667 0 013 14.166zm0-4a1.333 1.333 0 100 2.667 1.333 1.333 0 000-2.667zm8-8a1.333 1.333 0 101.333 1.394v.266V3.5c0-.737-.597-1.334-1.333-1.334z"
        fill="#D5BBFF"
      />
    </svg>
  );
}
