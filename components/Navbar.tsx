import { FC, useEffect, useState } from "react";

import styles from "../styles/Navbar.module.css";

const Navbar: FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className={styles.navbar}>
      <a
        href="https://quack-ai.com"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.logoSection}
      >
        <img src="/quack.png" alt="Quack AI" className={styles.logo} />
        <span className={styles.companyName}>Quack AI</span>
      </a>
    </nav>
  );
};

export default Navbar;
