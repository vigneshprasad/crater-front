export default function InfoFill(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#info-fill_svg__clip0_5891_6442)">
        <path
          d="M10 18.335a8.333 8.333 0 110-16.667 8.333 8.333 0 110 16.667zm-.833-9.167v5h1.666v-5H9.167zm0-3.333V7.5h1.666V5.835H9.167z"
          fill="#98ABF9"
        />
      </g>
      <defs>
        <clipPath id="info-fill_svg__clip0_5891_6442">
          <path fill="#fff" d="M0 0h20v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
