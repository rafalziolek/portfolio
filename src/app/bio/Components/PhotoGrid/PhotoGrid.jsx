import styles from "./PhotoGrid.module.scss";
function PhotoGrid() {
  return (
    <div className={`${styles["photo-grid"]}`}>
      <div style={{ height: "400px", backgroundColor: "#ffffff20" }} />
      <div style={{ height: "400px", backgroundColor: "#ffffff20" }} />
      <div style={{ height: "400px", backgroundColor: "#ffffff20" }} />
    </div>
  );
}

export default PhotoGrid;
