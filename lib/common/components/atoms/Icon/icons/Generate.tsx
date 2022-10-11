export default function Generate(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.029 2.027a.667.667 0 01.942 0l2 2a.667.667 0 010 .943l-2 2a.667.667 0 01-.942-.943l.862-.862H8.833C6.468 5.165 4.5 7.133 4.5 9.5c0 2.365 1.968 4.333 4.333 4.333 2.366 0 4.334-1.968 4.334-4.333a.667.667 0 011.333 0c0 3.1-2.565 5.666-5.667 5.666-3.1 0-5.666-2.565-5.666-5.666 0-3.102 2.565-5.667 5.666-5.667h1.058l-.862-.862a.667.667 0 010-.943z"
        fill="#D5BBFF"
      />
    </svg>
  );
}
