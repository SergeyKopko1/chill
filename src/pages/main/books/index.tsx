import { gsap } from 'gsap';
import React, { useState, useRef } from 'react';

import backgroundAccents from '@/assets/icon/header__background.png';
import historyOne from '@/assets/icon/1_финал.jpg';
import historyTwo from '@/assets/icon/2_финал.jpg';
import historyThree from '@/assets/icon/3_финал.jpg';
import historyFour from '@/assets/icon/4_финал.jpg';
import historyFive from '@/assets/icon/5_финал.jpg';
import historySix from '@/assets/icon/6_финал.jpg';
import historySeven from '@/assets/icon/7_финал.jpg';

import UnifiedModal from '@/components/ui/modal';
import styles from './styles.module.scss';

interface PageData {
  background: string;
  description?: string;
  text?: string;
  links?: string[];
}

interface PageDataUnified {
  background: string;
  description: string;
  text: string;
  links?: string[];
}

function normalizePages(
  input: { [key: string]: PageData[] } | PageData[]
): PageDataUnified[] {
  if (Array.isArray(input)) {
    return input.map((item) => ({
      background: item.background,
      description: item.description || '',
      text: item.text || '',
      links: item.links || [],
    }));
  }
  return Object.values(input)
    .flat()
    .map((item) => ({
      background: item.background,
      description: item.description || '',
      text: item.text || '',
      links: item.links || [],
    }));
}

const cardInformation: { [key: string]: PageData[] } = {
  Histories: [
    {
      background: historyOne.src,
      description: 'Day 1: The War for Territory',
      text: "A conflict erupted at the edge of the icy continent. The bears accused the penguins of stealing their fish. 'This is our territory!' growled the bears. 'We have always lived here!' replied the penguins.",
    },
    {
      background: historyTwo.src,
      description: 'Day 2: The Ice Wall',
      text: "To protect themselves, the penguins built a massive ice wall. 'We won't let the bears intimidate us!' said the penguin leader, Pebble.",
    },
    {
      background: historyThree.src,
      description: "Day 3: The Bears' Attack",
      text: "The bears, led by a young and impulsive Boreas, decided to destroy the wall. 'We'll show them who's in charge here!' he declared.",
    },
    {
      background: historyFour.src,
      description: 'Day 4: An Unexpected Threat',
      text: "During the attack, the ice began to crack. 'It's an earthquake!' shouted Pebble. Both bears and penguins were in danger.",
    },
    {
      background: historyFive.src,
      description: 'Day 5: A Shared Crisis',
      text: "The earthquake split the ice, leaving both groups stranded on a separate floe drifting in the open ocean. 'We must work together to survive,' said Bart.",
    },
    {
      background: historySix.src,
      description: 'Day 6: First Steps Toward Peace',
      text: "The penguins shared their fish, and the bears helped keep everyone warm. 'Maybe we're not so different after all,' thought Pebble.",
    },
    {
      background: historySeven.src,
      description: 'Day 7: Saving the Whale',
      text: "On their journey, they encountered a whale tangled in nets. 'We must help!' said Bart. Together, they freed the whale, who then helped them return to shore.",
    },
    {
      background: historyOne.src,
      description: 'Day 8: Returning Home',
      text: "When they returned to shore, both groups realized their home had changed. The ice was melting faster than ever. 'We must stop this,' said Pebble.",
    },
    {
      background: historyTwo.src,
      description: 'Day 9: A Shared Mission',
      text: "The bears and penguins decided to unite to save their home. 'We are stronger together,' said Bart.",
    },
  ],
  Collaborations: [
    {
      background: historyThree.src,
      description: 'Partnership with TechCorp',
      text: 'Our joint project with TechCorp resulted in groundbreaking innovations...',
      links: ['https://twitter.com/techcorp'],
    },
    {
      background: historyFour.src,
      description: 'Global Alliance Initiative',
      text: 'Joining forces with 15 international partners to tackle global challenges...',
      links: ['https://twitter.com/globalalliance'],
    },
  ],
};

const BooksBlock: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [snowRemoved, setSnowRemoved] = useState<{ [key: string]: boolean }>({
    Histories: false,
    Collaborations: false,
  });
  const cardRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const iceCrackRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (key: string) => {
    const card = cardRefs.current[key];
    if (!card) return;

    if (!snowRemoved[key]) {
      const snowLayer = card.querySelector(`.${styles.snowLayer}`);

      if (snowLayer) {
        gsap.to(snowLayer, {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            setSnowRemoved((prev) => ({ ...prev, [key]: true }));

            if (key === 'Histories' && iceCrackRef.current) {
              gsap.fromTo(
                iceCrackRef.current,
                { scaleY: 0, opacity: 0 },
                { scaleY: 1, opacity: 1, duration: 0.5 }
              );
            }

            const rect = card.getBoundingClientRect();
            const centerX = window.innerWidth / 2 - rect.width / 2;
            const centerY = window.innerHeight / 2 - rect.height / 2;

            gsap.to(card, {
              x: centerX - rect.left,
              y: centerY - rect.top,
              rotate: 15,
              scale: 1.2,
              duration: 0.6,
              ease: 'power3.inOut',
              zIndex: 1000,
              onComplete: () => {
                setActiveCard(key);
                gsap.to(card, {
                  x: 0,
                  y: 0,
                  scale: 1,
                  rotate: 15,
                  duration: 0,
                  clearProps: 'all',
                });
              },
            });
          },
        });
      }
    } else {
      const rect = card.getBoundingClientRect();
      const centerX = window.innerWidth / 2 - rect.width / 2;
      const centerY = window.innerHeight / 2 - rect.height / 2;

      gsap.to(card, {
        x: centerX - rect.left,
        y: centerY - rect.top,
        scale: 1.5,
        rotate: -15,
        duration: 1,
        ease: 'power3.inOut',
        zIndex: 1000,
        onComplete: () => {
          setActiveCard(key);
          gsap.to(card, {
            x: 0,
            y: 0,
            scale: 1,
            rotate: -15,
            duration: 0,
            clearProps: 'all',
          });
        },
      });
    }
  };

  const closeModal = () => {
    setActiveCard(null);
  };

  return (
    <section id="books" className={styles.books__wrapper}>
      <span>Collaborations and Histories</span>
      <section className={styles.cardsContainer}>
        {Object.keys(cardInformation).map((key) => (
          <React.Fragment key={key}>
            <div
              className={styles.card__wrapper}
              role="button"
              tabIndex={0}
              ref={(el) => {
                if (el) cardRefs.current[key] = el;
              }}
              onClick={() => handleCardClick(key)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === 'Space')
                  handleCardClick(key);
              }}
            >
              <div
                className={styles.cardContent}
                style={{ backgroundImage: `url(${backgroundAccents.src})` }}
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

      {activeCard && (
        <UnifiedModal
          onClose={closeModal}
          pages={normalizePages(cardInformation[activeCard])}
        />
      )}
    </section>
  );
};

export default BooksBlock;
