import { useState } from 'react';
import styles from './styles.module.scss';
import ingloo from '@/assets/icon/Igloo.png';

export const Information = () => {
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
      <p>Information</p>
      <div className={styles.igloos__grid}>
        {iglooData.map((igloo) => (
          <div
            key={igloo.id}
            className={styles.igloo__wrapper}
            onClick={() => openIgloo(igloo.id)}
          >
            <div className={styles.igloo__door}>
              <div className={styles.snowflakes}>
                {Array.from({ length: 20 }).map((_, i) => (
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
                <img
                  src={igloo.image}
                  alt={igloo.text}
                  className={styles.door__image}
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
                <iframe
                  src={iglooData[selectedContent! - 1].videoUrl}
                  className={styles.video__block}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                />
              ) : (
                <img
                  src={iglooData[selectedContent! - 1].imageUrl?.src}
                  alt="Igloo content"
                  className={styles.modal__image}
                />
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
