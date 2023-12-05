import MainNav from "@/components/main-nav/MainNav";
function WorkLayout({ children }) {
  return (
    <>
      <MainNav></MainNav>
      {children}
    </>
  );
}

export default WorkLayout;
