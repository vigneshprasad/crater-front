export default function Tv(props: React.SVGProps<SVGSVGElement>): JSX.Element {
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
        d="M15.414 5h5.594c.548 0 .992.446.992 1v14c0 .553-.455 1-.992 1H2.992A.996.996 0 012 20V6c0-.551.455-1 .992-1h5.594L6.05 2.466 7.464 1.05 11.414 5h1.172l3.95-3.95 1.414 1.414L15.414 5z"
        fill="currentColor"
      />
    </svg>
  );
}
