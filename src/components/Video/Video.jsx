export function Video() {
  return (
    <video
      width="100%"
      height="auto"
      //   controls
      preload="none"
      autoPlay
      muted
      loop
    >
      <source src="/Showreel-Grid-Mobile.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
