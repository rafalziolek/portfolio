function Corner({ flip, style, className }) {
  const styles = {
    transform: flip && "scaleX(-1)",
    position: "absolute",
    top: "0",
    left: flip && "0",
    right: "0",
    translate: "0 -100%",
    ...style,
  };
  return (
    <svg
      className={className}
      style={styles}
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 6C3.31371 6 6 3.31371 6 0V6H0Z"
        fill="black"
      />
    </svg>
  );
}

export default Corner;
