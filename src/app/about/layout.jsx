import MainNav from "@/components/main-nav/MainNav";
function BioLayout({ children }) {
  return (
    <>
      <MainNav></MainNav>
      {children}
    </>
  );
}

export default BioLayout;
