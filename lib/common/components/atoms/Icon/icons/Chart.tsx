type Props = React.SVGProps<SVGSVGElement>;

const Chart: React.FC<Props> = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g
      stroke="#808191"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        opacity={0.5}
        d="M7.372 10.201v6.86M12.038 6.92v10.143M16.628 13.826v3.235"
      />
      <path
        clipRule="evenodd"
        d="M16.686 2H7.314C4.048 2 2 4.312 2 7.585v8.83C2 19.688 4.038 22 7.314 22h9.372C19.962 22 22 19.688 22 16.415v-8.83C22 4.312 19.962 2 16.686 2z"
      />
    </g>
  </svg>
);

export default Chart;
