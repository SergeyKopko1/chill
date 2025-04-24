import Image from 'next/image';
import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';

import BackgroundAccens from '@/assets/icon/header__background.jpg';

import styles from './styles.module.scss';

interface PageData {
  background: string;
  description?: string;
  text?: string;
}

interface ModalProps {
  onClose: () => void;
  cardInformation: {
    [key: string]: PageData[];
  };
}

const Modal: React.FC<ModalProps> = ({ onClose, cardInformation }) => {
  const bookRef = useRef<any>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const pageWidth = Math.min(window.innerWidth * 0.3, 500);
  const pageHeight = Math.min(window.innerHeight * 0.8, 650);
  const bookWidth = pageWidth;

  const pages = Object.entries(cardInformation).flatMap(
    ([key, pageArray], sectionIndex) =>
      pageArray.flatMap((value, pageIndex) => [
        // Left page (image + description)
        <div
          key={`page-${sectionIndex}-${pageIndex * 2 + 1}`}
          className={`${styles.demoPage} ${styles.leftPage}`}
        >
          <Image
            src={value.background || BackgroundAccens.src}
            alt={`${key} image ${pageIndex}`}
            className={styles.pageImage}
          />
          <div className={styles.description}>
            {value.description || `${key} description ${pageIndex + 1}`}
          </div>
          <span className={styles.pageNumber}>
            {sectionIndex * pageArray.length * 2 + pageIndex * 2 + 1}
          </span>
        </div>,
        // Right page (text)
        <div
          key={`page-${sectionIndex}-${pageIndex * 2 + 2}`}
          className={`${styles.demoPage} ${styles.rightPage}`}
        >
          <div className={styles.description}>
            {value.description || `${key} description ${pageIndex + 1}`}
          </div>
          <div className={styles.textContent}>
            {value.text || `${key} text content ${pageIndex + 1}`}
          </div>
          <span className={styles.pageNumber}>
            {sectionIndex * pageArray.length * 2 + pageIndex * 2 + 2}
          </span>
        </div>,
      ])
  );

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modal__overlay} onClick={handleOverlayClick}>
      <div className={styles.modal__content} ref={modalContentRef}>
        <button className={styles.close__button} onClick={() => onClose()}>
          ×
        </button>
        <HTMLFlipBook
          width={bookWidth}
          height={pageHeight}
          className={styles.flipBook}
          style={{ margin: '0 auto' }}
          startPage={0}
          size="fixed"
          minWidth={400}
          maxWidth={600}
          minHeight={400}
          maxHeight={450}
          drawShadow
          flippingTime={600}
          usePortrait={false}
          startZIndex={0}
          autoSize
          maxShadowOpacity={0}
          showCover={false}
          mobileScrollSupport={false}
          clickEventForward
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick
          ref={bookRef}
        >
          {pages}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default Modal;
