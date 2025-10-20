const DurationIcon = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      {...props}
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.125 8.5C2.125 9.33718 2.28989 10.1662 2.61027 10.9396C2.93064 11.7131 3.40022 12.4158 3.99219 13.0078C4.58417 13.5998 5.28694 14.0694 6.06039 14.3897C6.83384 14.7101 7.66282 14.875 8.5 14.875C9.33718 14.875 10.1662 14.7101 10.9396 14.3897C11.7131 14.0694 12.4158 13.5998 13.0078 13.0078C13.5998 12.4158 14.0694 11.7131 14.3897 10.9396C14.7101 10.1662 14.875 9.33718 14.875 8.5C14.875 6.80924 14.2033 5.18774 13.0078 3.99219C11.8123 2.79665 10.1908 2.125 8.5 2.125C6.80924 2.125 5.18774 2.79665 3.99219 3.99219C2.79665 5.18774 2.125 6.80924 2.125 8.5Z"
        stroke="#808899"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 4.95825V8.49992L10.625 10.6249"
        stroke="#808899"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DurationIcon;
