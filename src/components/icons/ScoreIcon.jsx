const ScoreIcon = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      {...props}
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.1406 10.4062V6.75L8.5 3.09375L1.85938 6.75L8.5 10.4062L11.9531 8.71875V12.6562C11.9531 13.7812 10.3594 14.9062 8.5 14.9062C6.64062 14.9062 5.04688 13.7812 5.04688 12.6562V8.71875"
        stroke="#808899"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ScoreIcon;
