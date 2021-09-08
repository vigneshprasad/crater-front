type Props = React.SVGProps<SVGSVGElement>;

const Activity = (props: Props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity={0.4}
      d="M7.745 14.781l2.993-3.89 3.414 2.682 2.93-3.78"
      stroke="#808191"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx={20.495}
      cy={4.2}
      r={1.922}
      stroke="#808191"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.425 3.12H8.157c-3.012 0-4.879 2.133-4.879 5.144v8.083c0 3.011 1.83 5.135 4.879 5.135h8.604c3.011 0 4.879-2.124 4.879-5.135v-7.04"
      stroke="#808191"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Activity;
