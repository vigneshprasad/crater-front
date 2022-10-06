export default function Page(
  props: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5714 0.570312H3.23807C2.26664 0.570312 2.09521 0.784027 2.09521 1.71317V13.9036C2.09521 14.8522 2.30474 15.0465 3.23807 15.0465H12.3809C13.3333 15.0465 13.5238 14.8675 13.5238 13.9036V5.52269H8.5714V0.570312ZM13.5238 4.37984L9.71426 0.570312V4.37984H13.5238Z"
        fill="currentColor"
      />
    </svg>
  );
}
