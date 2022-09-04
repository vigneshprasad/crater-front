export default function Tip(props: React.SVGProps<SVGSVGElement>): JSX.Element {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#tip_svg__clip0_3393_14313)" fill="#000">
        <path d="M11.198 0v3.2h1.6V0h-1.6zM5.364 5.836l-2.4-2.4-1.131 1.13 2.4 2.4 1.131-1.13zM19.764 6.967l2.4-2.4-1.131-1.131-2.4 2.4 1.131 1.13zM12 4.8a6.334 6.334 0 00-6.27 5.44l-.017.112a6.322 6.322 0 001.263 4.783C7.59 15.928 8 16.684 8 17.443V20a.8.8 0 00.8.8h6.4a.8.8 0 00.8-.8v-2.558c0-.759.41-1.516 1.024-2.308a6.322 6.322 0 001.263-4.783l-.016-.113A6.334 6.334 0 0012 4.801zM0 12.8h3.2v-1.6H0v1.6zM20.798 12.8h3.2v-1.6h-3.2v1.6zM9.6 24h4.8v-1.6H9.6V24z" />
      </g>
      <defs>
        <clipPath id="tip_svg__clip0_3393_14313">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
