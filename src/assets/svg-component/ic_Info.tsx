export const InfoIcon = ({
  size = 28,
  fill = "#696969",
}: {
  size?: number;
  fill?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 16 16"
      id="Info-Circle-Fill--Streamline-Bootstrap"
      height={size}
      width={size}
    >
      <path
        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m0.93 -9.412 -1 4.705c-0.07 0.34 0.029 0.533 0.304 0.533 0.194 0 0.487 -0.07 0.686 -0.246l-0.088 0.416c-0.287 0.346 -0.92 0.598 -1.465 0.598 -0.703 0 -1.002 -0.422 -0.808 -1.319l0.738 -3.468c0.064 -0.293 0.006 -0.399 -0.287 -0.47l-0.451 -0.081 0.082 -0.381 2.29 -0.287zM8 5.5a1 1 0 1 1 0 -2 1 1 0 0 1 0 2"
        strokeWidth="1"
      ></path>
    </svg>
  );
};
