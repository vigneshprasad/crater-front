export default function Send(
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
      <g clipPath="url(#send_svg__clip0_310_8022)">
        <path
          d="M1.946 9.165c-.522-.171-.527-.448.01-.624l19.087-6.26c.529-.173.832.119.684.628l-5.454 18.78c-.15.52-.455.538-.68.044L12 13.775l6-7.872-8 5.904-8.054-2.642z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="send_svg__clip0_310_8022">
          <path fill="currentColor" d="M0 0h24v23.614H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
