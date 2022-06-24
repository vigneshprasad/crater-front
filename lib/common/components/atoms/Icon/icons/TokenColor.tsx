export default function TokenColor(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 62.61 62.61"
      width="1em"
      height="1em"
      {...props}
    >
      <defs>
        <style>{".token_color_svg__cls-1{fill:#6426c6}"}</style>
      </defs>
      <g id="token_color_svg__Layer_2" data-name="Layer 2">
        <g id="token_color_svg__Layer_1-2" data-name="Layer 1">
          <path
            className="token_color_svg__cls-1"
            d="M48.94 15.91L34.26 1.22a4.18 4.18 0 00-5.91 0L13.67 15.91l17.51 14.64z"
          />
          <path
            className="token_color_svg__cls-1"
            d="M61.39 28.35L52 18.93 31 36.11 10.61 19l-9.39 9.35a4.18 4.18 0 000 5.91l27.13 27.13a4.18 4.18 0 005.91 0l27.13-27.13a4.18 4.18 0 000-5.91z"
          />
        </g>
      </g>
    </svg>
  );
}
