import React, { useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import styles from './styles.module.scss';
import BackgroundAccents from '@/assets/icon/header__background.jpg';

interface CollaborationItem {
  image: string;
  title: string;
  text: string;
  links?: string[];
}

interface CollaborationModalProps {
  onClose: () => void;
  items: CollaborationItem[];
}

const CollaborationModal: React.FC<CollaborationModalProps> = ({
  onClose,
  items,
}) => {
  const bookRef = useRef<any>(null); // Use `PageFlip` type if available from react-pageflip
  const modalContentRef = useRef<HTMLDivElement>(null);

  const pageWidth = Math.min(window.innerWidth * 0.3, 500);
  const pageHeight = Math.min(window.innerHeight * 0.8, 650);
  const bookWidth = pageWidth;

  // Transform items into left and right pages for the flip book
  const pages = items.flatMap((item, index) => [
    // Left page (image + title)
    <div
      key={`page-${index}-left`}
      className={`${styles.demoPage} ${styles.leftPage}`}
    >
      <img
        src={item.image || BackgroundAccents.src}
        alt={`${item.title} image`}
        className={styles.pageImage}
      />
      <div className={styles.description}>
        {item.title || `Collaboration ${index + 1}`}
      </div>
      <span className={styles.pageNumber}>{index * 2 + 1}</span>
    </div>,
    // Right page (text + links)
    <div
      key={`page-${index}-right`}
      className={`${styles.demoPage} ${styles.rightPage}`}
    >
      <div className={styles.description}>
        {item.title || `Collaboration ${index + 1}`}
      </div>
      <div className={styles.textContent}>
        {item.text || `Collaboration text ${index + 1}`}
      </div>
      {item.links && item.links.length > 0 && (
        <div className={styles.links}>
          {item.links.map((link, linkIndex) => (
            <a
              key={linkIndex}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Twitter
            </a>
          ))}
        </div>
      )}
      <span className={styles.pageNumber}>{index * 2 + 2}</span>
    </div>,
  ]);

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
          size={'fixed'}
          minWidth={400}
          maxWidth={600}
          minHeight={400}
          maxHeight={450}
          drawShadow={true}
          flippingTime={600}
          usePortrait={false}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={0}
          showCover={false}
          mobileScrollSupport={false}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={true}
          ref={bookRef}
        >
          {pages}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default CollaborationModal;
