type Props = React.SVGProps<SVGSVGElement>;

const ChevronDown = (props: Props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.28 8.305l-4.292 4.293-4.293-4.293A1 1 0 006.28 9.72l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z"
      fill="#808191"
    />
  </svg>
);

export default ChevronDown;
