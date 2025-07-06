// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import Image from "next/image";
// import { Menu, X } from "lucide-react";
// import LawImage from "@/public/logo.png"; // Adjust path if needed
// import styles from "./navbar.module.css";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   const isAdminRoute = pathname.startsWith("/admin");

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     setIsLoggedIn(!!token);

//     const handleStorageChange = () => {
//       const token = localStorage.getItem("accessToken");
//       setIsLoggedIn(!!token);
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, [pathname]);

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     setIsLoggedIn(false);
//     window.dispatchEvent(new Event("storage"));
//     router.push("/");
//   };

//   const toggleMenu = () => {
//     setMenuOpen((prev) => !prev);
//   };

//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.leftSection}>
//         <div className={styles.logo}>
//           <Image src={LawImage} alt="IGuide" className={styles.image} />
//         </div>

//         <div className={styles.hamburger} onClick={toggleMenu}>
//           {menuOpen ? <X size={24} /> : <Menu size={24} />}
//         </div>

//         <ul className={`${styles.navList} ${menuOpen ? styles.showMenu : ""}`}>
//           <li className={styles.navItem}>
//             <Link href="/">Home</Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/notes">Notes</Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/pastpapers">Past Papers</Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/referencebooks">Reference Books</Link>
//           </li>
//           <li className={styles.navItem}>
//             <Link href="/news">News</Link>
//           </li>

//           {isLoggedIn ? (
//             <>
//               <li className={styles.navItem}>
//                 <Link href="/addnote">Add Note</Link>
//               </li>
//               <li className={styles.navItem}>
//                 <Link href="/addpastpaper">Add Past Paper</Link>
//               </li>
//               <li className={styles.navItem}>
//                 <Link href="/addreferencebook">Add Reference Books</Link>
//               </li>
//               <li className={styles.navItem}>
//                 <Link href="/addad">Add Ad</Link>
//               </li>
//               <li className={styles.navItem}>
//                 <Link href="/addnews">Add News</Link>
//               </li>
//               <li className={styles.navItem}>
//                 <Link href="/manage-access">Manage Access</Link>
//               </li>
//               <li
//                 className={styles.navItem}
//                 onClick={handleLogout}
//                 style={{ cursor: "pointer" }}
//               >
//                 Logout
//               </li>
//             </>
//           ) : (
//             isAdminRoute && (
//               <>
//                 <li className={styles.navItem}>
//                   <Link href="/login">Login</Link>
//                 </li>
//                 <li className={styles.navItem}>
//                   <Link href="/signup">Signup</Link>
//                 </li>
//               </>
//             )
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import LawImage from "@/public/logo.png";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isAdminRoute = pathname.startsWith("/admin");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    router.push("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const getNavItemClass = (path) =>
    `${styles.navItem} ${pathname === path ? styles.active : ""}`;

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <Image src={LawImage} alt="IGuide" className={styles.image} />
        </div>

        <div className={styles.hamburger} onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <ul className={`${styles.navList} ${menuOpen ? styles.showMenu : ""}`}>
          <li className={getNavItemClass("/")}>
            <Link href="/">Home</Link>
          </li>
          <li className={getNavItemClass("/notes")}>
            <Link href="/notes">Notes</Link>
          </li>
          <li className={getNavItemClass("/pastpapers")}>
            <Link href="/pastpapers">Past Papers</Link>
          </li>
          <li className={getNavItemClass("/referencebooks")}>
            <Link href="/referencebooks">Reference Books</Link>
          </li>
          <li className={getNavItemClass("/news")}>
            <Link href="/news">News</Link>
          </li>

          {isLoggedIn ? (
            <>
              <li className={getNavItemClass("/addnote")}>
                <Link href="/addnote">Add Note</Link>
              </li>
              <li className={getNavItemClass("/addpastpaper")}>
                <Link href="/addpastpaper">Add Past Paper</Link>
              </li>
              <li className={getNavItemClass("/addreferencebook")}>
                <Link href="/addreferencebook">Add Reference Books</Link>
              </li>
              <li className={getNavItemClass("/addad")}>
                <Link href="/addad">Add Ad</Link>
              </li>
              <li className={getNavItemClass("/addnews")}>
                <Link href="/addnews">Add News</Link>
              </li>
              <li className={getNavItemClass("/manage-access")}>
                <Link href="/manage-access">Manage Access</Link>
              </li>
              <li
                className={styles.navItem}
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
              >
                Logout
              </li>
            </>
          ) : (
            isAdminRoute && (
              <>
                <li className={getNavItemClass("/login")}>
                  <Link href="/login">Login</Link>
                </li>
                <li className={getNavItemClass("/signup")}>
                  <Link href="/signup">Signup</Link>
                </li>
              </>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
