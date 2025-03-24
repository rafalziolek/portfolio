import styles from "./ProfilePhoto.module.scss";
function ProfilePhoto() {
  return (
    <svg
      className={styles["profile-photo"]}
      width="428"
      height="471"
      viewBox="0 0 428 471"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="clip">
          <rect
            x="176"
            y="-67"
            width="368"
            height="486"
            rx="184"
            transform="rotate(30 176 -67)"
            fill="white"
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
