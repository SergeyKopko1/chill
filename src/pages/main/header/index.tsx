import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FC, useState } from 'react';
import { Snowfall } from 'react-snowfall';
import BearOne from '@/assets/icon/bear1.png';
import BearTwo from '@/assets/icon/bear2.png';
import BearThree from '@/assets/icon/bear3.png';
import Background from '@/assets/icon/header__background.jpg';
import igloo from '@/assets/icon/Igloo.png';
import Button from '@/components/ui/button';
import styles from './styles.module.scss';

const Header: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className={styles.container__header__main}>
      <div className={styles.snowfall}>
        <Snowfall
          color="white"
          snowflakeCount={100}
          speed={[0.5, 1.5]}
          wind={[-0.5, 0.5]}
          radius={[0.5, 2]}
        />
      </div>

      <nav className={styles.container__header}>
        <div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              className={styles.button}
              name="Menu"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
          >
            <Image className={styles.Igloo} src={igloo} alt="Igloo" />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('information')?.scrollIntoView({
                behavior: 'smooth',
              });
              setMenuOpen(false);
            }}
          >
            <Button className={styles.button} name="Information" />
          </motion.div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.menu}
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <button
              type="button"
              className={styles.close__button}
              onClick={() => setMenuOpen(false)}
            >
              ×
            </button>

            <div className={styles.menuContent}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({
                    behavior: 'smooth',
                  });
                  setMenuOpen(false);
                }}
              >
                About Us
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#books"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('books')?.scrollIntoView({
                    behavior: 'smooth',
                  });
                  setMenuOpen(false);
                }}
              >
                Books
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#roadmap"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('roadmap')?.scrollIntoView({
                    behavior: 'smooth',
                  });
                  setMenuOpen(false);
                }}
              >
                Roadmap
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#footer"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('footer')?.scrollIntoView({
                    behavior: 'smooth',
                  });
                  setMenuOpen(false);
                }}
              >
                Social
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.background__header}>
        <Image src={Background} alt="Background" />
      </div>

      <motion.div
        className={styles.text__header}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.span
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
        THE CHILL'BE
        </motion.span>
        <p>
          Chilly Beary is a global IP focused on proliferating the penguin,
          memetic culture, and good vibes.
        </p>
      </motion.div>

      <footer className={styles.bears__header}>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <Image src={BearTwo} alt="Bear Two" />
        </motion.div>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
        >
          <Image src={BearOne} alt="Bear One" />
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
        >
          <Image src={BearThree} alt="Bear Three" />
        </motion.div>
      </footer>
    </section>
  );
};

export default Header;
