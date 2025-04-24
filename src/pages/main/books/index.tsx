import React, { useState, useRef } from 'react';
import styles from './styles.module.scss';
import BackgroundAccents from '@/assets/icon/header__background.jpg';
import BookModal from '@/components/ui/modal';
import CollaborationModal from '@/components/ui/modal/collaborationModal';
import { gsap } from 'gsap';

interface PageData {
  background: string;
  description?: string;
  text?: string;
  links?: string[];
}

const CardInformation: { [key: string]: PageData[] } = {
  Histories: [
    {
      background: BackgroundAccents.src,
      description: 'Our foundation story from 2010',
      text: 'In 2010, our founders came together with a vision to revolutionize the industry...',
    },
    {
      background: BackgroundAccents.src,
      description: 'The breakthrough of 2015',
      text: 'The smoked meat of 2015 marked a turning point when we introduced our flagship product...',
    },
  ],
  Collaborations: [
    {
      background: BackgroundAccents.src,
      description: 'Partnership with TechCorp',
      text: 'Our joint project with TechCorp resulted in groundbreaking innovations...',
      links: ['https://twitter.com/techcorp'],
    },
    {
      background: BackgroundAccents.src,
      description: 'Global Alliance Initiative',
      text: 'Joining forces with 15 international partners to tackle global challenges...',
      links: ['https://twitter.com/globalalliance'],
    },
  ],
};

export const BooksBlock: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [snowRemoved, setSnowRemoved] = useState<{ [key: string]: boolean }>({
    Histories: false,
    Collaborations: false,
  });
  const cardRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const iceCrackRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (key: string) => {
    if (!snowRemoved[key]) {
      const card = cardRefs.current[key];
      const snowLayer = card?.querySelector(`.${styles.snowLayer}`);

      if (snowLayer && card) {
        // Step 1: Snow removal animation
        gsap.to(snowLayer, {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            setSnowRemoved((prev) => ({ ...prev, [key]: true }));

            // Step 2: Ice crack animation (for Histories card)
            if (key === 'Histories' && iceCrackRef.current) {
              gsap.fromTo(
                iceCrackRef.current,
                { scaleY: 0, opacity: 0 },
                { scaleY: 1, opacity: 1, duration: 0.5 },
              );
            }

            // Step 3: Zoom-to-center animation
            const rect = card.getBoundingClientRect();
            const centerX = window.innerWidth / 2 - rect.width / 2;
            const centerY = window.innerHeight / 2 - rect.height / 2;

            gsap.to(card, {
              x: centerX - rect.left,
              y: centerY - rect.top,
              rotate: -60,
              scale: 1.2,
              duration: 0.6,
              ease: 'power3.inOut',

              zIndex: 1000,
              onComplete: () => {
                // Step 4: Open modal and reset card position
                setActiveCard(key);
                gsap.to(card, {
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: -60,
                  duration: 0,
                  clearProps: 'all', // Reset GSAP styles
                });
              },
            });
          },
        });
      }
    } else {
      // If snow is already removed, zoom and open modal directly
      const card = cardRefs.current[key];
      if (card) {
        const rect = card.getBoundingClientRect();
        const centerX = window.innerWidth / 2 - rect.width / 2;
        const centerY = window.innerHeight / 2 - rect.height / 2;

        gsap.to(card, {
          x: centerX - rect.left,
          y: centerY - rect.top,
          scale: 1.5,
          rotate: -60,
          duration: 1,
          ease: 'power3.inOut',
          zIndex: 1000,
          onComplete: () => {
            setActiveCard(key);
            gsap.to(card, {
              x: 0,
              y: 0,
              scale: 1,
              rotate: -45,
              duration: 0,
              clearProps: 'all',
            });
          },
        });
      }
    }
  };

  const closeModal = () => {
    setActiveCard(null);
  };

  return (
    <section id='books' className={styles.books__wrapper}>
      <span>Collaborations and Histories</span>
      <section className={styles.cardsContainer}>
        {Object.entries(CardInformation).map(([key, pageArray]) => (
          <React.Fragment key={key}>
            <div
              className={styles.card__wrapper}
              ref={(el) => {
                if (el) cardRefs.current[key] = el;
              }}
              onClick={() => handleCardClick(key)}
            >
              <div
                className={styles.cardContent}
                style={{
                  backgroundImage: `url(${pageArray[0].background})`,
                }}
              >
                <p className={styles.cardTitle}>{key}</p>
                <div
                  className={`${styles.snowLayer} ${snowRemoved[key] ? styles.removed : ''}`}
                />
                {!snowRemoved[key] && (
                  <div className={styles.hint}>Click to reveal</div>
                )}
              </div>
            </div>

            {key === 'Histories' && (
              <div className={styles.iceCrack} ref={iceCrackRef} />
            )}
          </React.Fragment>
        ))}
      </section>

      {/* Modals */}
      {activeCard === 'Histories' && (
        <BookModal
          onClose={closeModal}
          cardInformation={{ Histories: CardInformation.Histories }}
        />
      )}

      {activeCard === 'Collaborations' && (
        <CollaborationModal
          onClose={closeModal}
          items={CardInformation.Collaborations.map((collab) => ({
            image: collab.background,
            text: collab.text || '',
            title: collab.description || '',
            links: collab.links || [],
          }))}
        />
      )}
    </section>
  );
};

export default BooksBlock;
