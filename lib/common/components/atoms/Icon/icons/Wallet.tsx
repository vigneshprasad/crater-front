type Props = React.SVGProps<SVGSVGElement>;

const Wallet = (props: Props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M22.139 14.396H18.09a2.692 2.692 0 010-5.383h4.048M18.549 11.643h-.312"
      stroke="#808191"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M8.248 3h8.643a5.248 5.248 0 015.248 5.248v7.177a5.248 5.248 0 01-5.248 5.247H8.248A5.248 5.248 0 013 15.425V8.248A5.248 5.248 0 018.248 3z"
      stroke="#808191"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      opacity={0.5}
      d="M7.536 7.538h5.399"
      stroke="#808191"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Wallet;
