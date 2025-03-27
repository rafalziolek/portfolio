import styles from "./ProfilePhoto.module.scss";
import Portal from "../Portal/Portal";
import { motion } from "motion/react";

function ProfilePhoto() {
  const paragraphVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(6px)",
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      filter: "blur(4px)",
      scale: 0.98,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <Portal>
      <motion.div
        variants={paragraphVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles["profile-photo"]}
      >
        <svg
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
      </motion.div>
    </Portal>
  );
}

export default ProfilePhoto;
