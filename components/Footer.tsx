import { FC } from "react";
import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";

import styles from "../styles/Footer.module.css";

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footerContainer}>
      <p>© {currentYear} Quack Labs, Inc.</p>
      <div className={styles.socialLinks}>
        <a
          href="https://discord.gg/E9rY3bVCWd"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaDiscord className={styles.socialIcon} color="#5865F2" />
        </a>
        <a
          href="https://github.com/quack-ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className={styles.socialIcon} />
        </a>
        <a
          href="https://twitter.com/quack_ai"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className={styles.socialIcon} color="#1D9BF0" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
