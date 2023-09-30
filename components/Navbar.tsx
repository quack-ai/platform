import Image from "next/image";
import { FC, useEffect, useState } from "react";

import styles from "../styles/Navbar.module.css";

const Navbar: FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoSection}>
        <Image
          src="/quack.png"
          alt="Quack AI"
          width={64}
          height={64}
          className={styles.logo}
        />
        <span className={styles.companyName}>Quack AI</span>
      </div>
    </nav>
  );
};

export default Navbar;
