import { useState, useEffect } from 'react';
import styles from './styles.module.scss';
import stepImage from '@/assets/icon/step.png';

export const Roadmap = () => {
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCards([1]);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleIntersection = (index: number) => {
    if (!animatedCards.includes(index)) {
      setAnimatedCards((prev) => [...prev, index]);
    }
  };

  const roadmapSteps = [
    {
      id: 1,
      title: 'Step 1',
      description:
        ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia, minus? Repellat, quo itaque obcaecati repudiandae a ex exercitationem quidem perspiciatis deleniti quod tempora, aperiam cum? Ipsa est quos quibusdam nobis?',
    },
    {
      id: 2,
      title: 'Step 2',
      description:
        ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia, minus? Repellat, quo itaque obcaecati repudiandae a ex exercitationem quidem perspiciatis deleniti quod tempora, aperiam cum? Ipsa est quos quibusdam nobis?',
    },
    {
      id: 3,
      title: 'Step 3',
      description:
        'М Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia, minus? Repellat, quo itaque obcaecati repudiandae a ex exercitationem quidem perspiciatis deleniti quod tempora, aperiam cum? Ipsa est quos quibusdam nobis?',
    },
    {
      id: 4,
      title: 'Step 4',
      description:
        ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia, minus? Repellat, quo itaque obcaecati repudiandae a ex exercitationem quidem perspiciatis deleniti quod tempora, aperiam cum? Ipsa est quos quibusdam nobis?',
    },
    {
      id: 5,
      title: 'Step 5',
      description:
        ' Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia, minus? Repellat, quo itaque obcaecati repudiandae a ex exercitationem quidem perspiciatis deleniti quod tempora, aperiam cum? Ipsa est quos quibusdam nobis?',
    },
  ];

  return (
    <section id='roadmap' className={styles.container__roadmap}>
      <h2 className={styles.roadmap__title}>ROADMAP</h2>
      <section className={styles.container__cards__wrapper}>
        {roadmapSteps.map((step, index) => (
          <div
            key={step.id}
            className={`${styles.card} ${index % 2 === 0 ? styles.left : styles.right} ${animatedCards.includes(index + 1) ? styles.animated : ''}`}
            onMouseEnter={() => handleIntersection(index + 1)}
          >
            <div className={styles.card__content}>
              <div className={styles.card__header}>
                <img src={stepImage.src} alt="step" className={styles.step__icon} />
                
                <h3 className={styles.step__title}>{step.title}</h3>
              </div>
              <p className={styles.step__description}>{step.description}</p>
            </div>
          
          </div>
        ))}
      </section>
    </section>
  );
};
