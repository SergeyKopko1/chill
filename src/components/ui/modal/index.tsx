import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import HTMLFlipBook from 'react-pageflip';
import { useSwipeable } from 'react-swipeable';
import Button from '@/components/ui/button';
import BackgroundAccents from '@/assets/icon/header__background.png';
import styles from './styles.module.scss';

interface PageDataUnified {
  background: string;
  description: string;
  text: string;
  links?: string[];
}

interface UnifiedModalProps {
  onClose: () => void;
  pages: PageDataUnified[];
}

interface BookRef {
  pageFlip: () => {
    flipPrev: () => void;
    flipNext: () => void;
  };
}

const UnifiedModal: React.FC<UnifiedModalProps> = ({ onClose, pages }) => {
  const bookRef = useRef<BookRef | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = pages.length;

  const goPrev = useCallback(() => {
    if (isMobile) {
      setCurrentPage((prev) => Math.max(0, prev - 1));
    } else {
      bookRef.current?.pageFlip()?.flipPrev();
    }
  }, [isMobile]);

  const goNext = useCallback(() => {
    if (isMobile) {
      setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
    } else {
      bookRef.current?.pageFlip()?.flipNext();
    }
  }, [isMobile, totalPages]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    trackMouse: true,
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, onClose]);

  const pcPages = pages.flatMap((page, index) => [
    <div
      key={`page-left-${index}`}
      className={`${styles.demoPage} ${styles.leftPage}`}
    >
      <Image
        width={400}
        height={400}
        src={page.background || BackgroundAccents.src}
        alt={`Page image ${index}`}
        className={styles.pageImage}
      />
      <div className={styles.description}>{page.description}</div>
      <span className={styles.pageNumber}>{index * 2 + 1}</span>
    </div>,
    <div
      key={`page-right-${index}`}
      className={`${styles.demoPage} ${styles.rightPage}`}
    >
      <div className={styles.description}>{page.description}</div>
      <div className={styles.textContent}>{page.text}</div>
      {page.links && page.links.length > 0 && (
        <div className={styles.links}>
          {page.links.map((link, idx) => (
            <a
              key={`link-${index}-${idx}`}
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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') onClose();
  };

  return (
    <div
      className={styles.modal__overlay}
      onClick={handleOverlayClick}
      onKeyDown={handleOverlayKeyDown}
      role="dialog"
      aria-modal="true"
      tabIndex={0}
    >
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="document"
      >
        <button
          type="button"
          className={styles.close__button}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {!isMobile ? (
          <div className={styles.bookWrapper}>
            <div className={styles.bookSpine} />
            <HTMLFlipBook
              width={550}
              height={750}
              className={styles.flipBook}
              style={{ margin: '0 auto' }}
              startPage={0}
              size="fixed"
              minWidth={400}
              maxWidth={600}
              minHeight={650}
              maxHeight={750}
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
              {pcPages}
            </HTMLFlipBook>
          </div>
        ) : (
          <>
            <div
              className={styles.mobileBook}
              {...swipeHandlers}
              role="region"
              aria-label="Mobile book content"
            >
              <div className={styles.mobilePage}>
                <Image
                  width={400}
                  height={400}
                  src={pages[currentPage].background || BackgroundAccents.src}
                  alt={`Page ${currentPage + 1}`}
                  className={styles.pageImage}
                />
                <div className={styles.description}>
                  {pages[currentPage].description}
                </div>
                <div className={styles.textContent}>
                  {pages[currentPage].text}
                </div>
                {pages[currentPage].links && (
                  <div className={styles.links}>
                    {pages[currentPage].links.map((link, idx) => (
                      <a
                        key={`mobile-link-${currentPage}-${idx}`}
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
                <div className={styles.pageNumber}>
                  Страница {currentPage + 1} из {totalPages}
                </div>
              </div>
            </div>

            <div className={styles.mobileNav}>
              <Button
                type="button"
                className={styles.navButton}
                onClick={goPrev}
                disabled={currentPage === 0}
                aria-label="Previous page"
                name="Previous"
              />
              <Button
                type="button"
                className={styles.navButton}
                onClick={goNext}
                disabled={currentPage === totalPages - 1}
                aria-label="Next page"
                name="Next"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UnifiedModal;
