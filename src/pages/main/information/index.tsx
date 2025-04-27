import Image from 'next/image';
import { useState } from 'react';

import ingloo from '@/assets/icon/Igloo.png';

import styles from './styles.module.scss';

const Information = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<null | number>(null);

  const iglooData = [
    {
      id: 1,
      videoUrl: '/assets/videos/igloo1.mp4',
      text: 'Winter Adventure',
      image: '/path/to/image1.jpg',
    },
    { id: 2, imageUrl: ingloo, text: 'Ice Kingdom', image: ingloo.src },
    {
      id: 3,
      videoUrl: '/assets/videos/igloo3.mp4',
      text: 'Northern Lights',
      image: '/path/to/image3.jpg',
    },
  ];

  const openIgloo = (id: number) => {
    setSelectedContent(id);
    setModalOpen(true);
  };

  return (
    <section id="information" className={styles.container__information__main}>
      <p className={styles.section__title}>Information</p>
      <div className={styles.igloos__grid}>
        {iglooData.map((igloo) => (
          <div
            key={igloo.id}
            className={styles.igloo__wrapper}
            onClick={() => openIgloo(igloo.id)}
          >
            <div className={styles.igloo__door}>
              <div className={styles.snowflakes}>
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className={styles.snowflake}
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDuration: `${Math.random() * 5 + 2}s`,
                      animationDelay: `${Math.random() * 5}s`,
                    }}
                  />
                ))}
              </div>
              <div className={styles.door__content}>
                <Image
                  width={120}
                  height={120}
                  src={igloo.image}
                  alt={igloo.text}
                  className={styles.door__image}
                  priority={igloo.id < 3}
                />
                <p className={styles.click__text}>{igloo.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.ice__modal}>
          <div className={styles.iced__paper}>
            <button
              className={styles.close__button}
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>
            <div className={styles.modal__content}>
              {iglooData[selectedContent! - 1].videoUrl ? (
                <div className={styles.video__container}>
                  <iframe
                    title={iglooData[selectedContent! - 1].text}
                    src={iglooData[selectedContent! - 1].videoUrl}
                    className={styles.video__block}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className={styles.image__container}>
                  <Image
                    width={300}
                    height={200}
                    src={
                      iglooData[selectedContent! - 1].imageUrl?.src ??
                      '/fallback-image.jpg'
                    }
                    alt="Igloo content"
                    className={styles.modal__image}
                  />
                </div>
              )}
              <p className={styles.iced__text}>
                {iglooData[selectedContent! - 1].text}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Information;
