const SingOutIcon = ({ className, ...props }) => {
  return (
    <svg
      className={className}
      {...props}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.0001 3.66666H4.58341C4.07925 3.66666 3.66675 4.07916 3.66675 4.58332V17.4167C3.66675 17.9208 4.07925 18.3333 4.58341 18.3333H11.0001"
        stroke="#E7E7E7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.25 11H18.7917"
        stroke="#E7E7E7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5835 7.79166L18.7918 11L15.5835 14.2083"
        stroke="#E7E7E7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SingOutIcon;
