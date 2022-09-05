export default function CheckCircle(
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
        d="M11.889 3a8.889 8.889 0 100 17.778 8.889 8.889 0 000-17.778zm5.805 5.906l-7.3 7.294-4.31-4.311a.786.786 0 011.11-1.111l3.212 3.21 6.188-6.182a.786.786 0 011.112 1.11l-.012-.01z"
        fill="currentColor"
      />
    </svg>
  );
}
