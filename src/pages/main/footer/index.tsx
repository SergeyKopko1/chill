import styles from './styles.module.scss';
import { FaTwitter, FaDiscord, FaInstagram, FaTelegram } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__snow}></div>

        <div className={styles.footer__links}>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.social__link}
          >
            <FaTwitter className={styles.social__icon} />
            <span>Twitter</span>
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.social__link}
          >
            <FaDiscord className={styles.social__icon} />
            <span>Discord</span>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.social__link}
          >
            <FaInstagram className={styles.social__icon} />
            <span>Instagram</span>
          </a>
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.social__link}
          >
            <FaTelegram className={styles.social__icon} />
            <span>Telegram</span>
          </a>
        </div>

        <div className={styles.footer__credits}>
          <p>© 2023 Our Awesome ChillyBeary</p>
          <div className={styles.penguin__track}></div>
        </div>
      </div>
    </footer>
  );
};
