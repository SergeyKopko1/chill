import styles from './styles.module.scss';
import { Card } from '@/components/ui/card';

const dataAbout = {
  AboutUs: {
    title: 'Кто мы такие',
    description:
      'Мы команда как дружные медвежата - сильные вместе и заботливые к каждому проекту! Наш опыт - это как медвежья берлога, уютная и надежная.',
    emoji: '🐻',
    color: '#FF9E9E',
  },
  YourMission: {
    title: 'Наша миссия',
    description:
      'Как медведь добывает мед, мы добываем лучшие решения для вас. Наша цель - сделать ваш digital-опыт сладким как мед!',
    emoji: '🍯',
    color: '#FFD6A5',
  },
  YourWork: {
    title: 'Как мы работаем',
    description:
      'По-медвежьи основательно! Каждый этап продуман как подготовка к зимней спячке - ничего не упускаем и делаем на совесть.',
    emoji: '🛠️',
    color: '#CBFFA9',
  },
  WhatBears: {
    title: 'Почему мы?',
    description:
      'Потому что мы сильны как бурый мишка, быстры как панда и дружелюбны как мишка Тедди! 10 лет опыта в digital-лесу.',
    emoji: '❓',
    color: '#A0C4FF',
  },
  Commands: {
    title: 'Наша команда',
    description:
      'Разнообразная как виды медведей - дизайнеры-панды, разработчики-гризли, маркетологи-полярные мишки. Всех объединяет сила и теплота!',
    emoji: '👥',
    color: '#BDB2FF',
  },
};

export const About = () => {
  return (
    <section id="about" className={styles.arctic__wrapper}>
      <div className={styles.iceberg__container}>
        <div className={styles.polar__header}>
            <span>Arctic Bearers</span>
          <div className={styles.aurora}></div>
        </div>

        <div className={styles.icewall__grid}>
          {Object.entries(dataAbout).map(([key, value], index) => (
            <Card
              key={key}
              title={
                <>
                  <span className={styles.emoji__wrapper}>{value.emoji}</span>
                  {value.title}
                </>
              }
              description={value.description}
              style={
                {
                  '--ice-color': value.color,
                  '--delay': index * 0.2 + 's',
                } as React.CSSProperties
              }
              className={`${styles.iceblock} ${
                styles[`iceblock--${(index % 3)}`]
              }`}
            />
          ))}
        </div>

        <div className={styles.glacier__footer}>
          <p>Join our Arctic Den!</p>
        </div>
      </div>
    </section>
  );
};