"use client";
import CustomLink from "../custom-link/CustomLink";
import { usePathname } from "next/navigation";
import styles from "./MainNav.module.scss";

function NavLink({ children, href }) {
  //   const Id = React.useId();
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li
      className={`${styles["nav-item"]} ${
        isActive ? styles["active"] : undefined
      }`}
    >
      <CustomLink path={href} icon={false} className={`${styles["nav-link"]}`}>
        {children}
      </CustomLink>
    </li>
  );
}

export default NavLink;

// function NavLinks() {
//   const NAV_ITEMS = [
//     {
//       label: "Bio",
//       href: "/Bio",
//       id: Math.random(),
//     },
//     {
//       label: "Work",
//       href: "/Work",
//       id: Math.random(),
//     },
//   ];
//   const pathname = usePathname();
//   return (
//     <ul>
//       {NAV_ITEMS.map(() => {
//         const isActive = pathname === href;
//         return (
//           <li
//             className={`${styles["nav-item"]} ${
//               isActive ? styles["active"] : undefined
//             }`}
//             key={id}
//           >
//             <CustomLink path={href}>{label}</CustomLink>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

// export default NavLinks;
