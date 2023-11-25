import styles from "./ProfilePhoto.module.scss";
function ProfilePhoto() {
  return (
    <svg
      className={styles["profile-photo"]}
      width="570"
      height="600"
      viewBox="0 0 631 683"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip">
          <rect
            x="312.918"
            y="-99.5977"
            width="510"
            height="720"
            rx="255"
            transform="rotate(35 312.918 -99.5977)"
            fill="#D9D9D9"
          />
        </clipPath>
      </defs>
      <image
        href="/portrait@2x.png"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        clipPath="url(#clip)"
      />
    </svg>
  );
}

export default ProfilePhoto;
