export default function Auction(
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
        d="M13.999 20v2h-12v-2h12zM14.585.686l7.778 7.778-1.414 1.416-1.06-.354L17.412 12l5.657 5.657-1.414 1.414-5.656-5.657-2.404 2.404.283 1.132-1.415 1.414-7.778-7.778L6.1 9.172l1.13.282 6.294-6.293-.353-1.06L14.585.686z"
        fill="currentColor"
      />
    </svg>
  );
}
