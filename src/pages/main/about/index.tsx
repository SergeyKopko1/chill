import Card from '@/components/ui/card';

import styles from './styles.module.scss';

const dataAbout = {
  AboutUs: {
    title: 'Who We Are',
    description:
      'We are a team like friendly little bears — strong together and caring for every project! Our experience is like a bear’s den — cozy and reliable.',
    emoji: '🐻',
    color: '#FF9E9E',
  },

  YourWork: {
    title: 'How We Work',
    description:
      'Thoroughly, like bears! Every stage is carefully thought out, like preparing for winter hibernation — we leave nothing to chance and do everything with care.',
    emoji: '🛠️',
    color: '#CBFFA9',
  },
  WhatBears: {
    title: 'Why Us?',
    description:
      'Because we are strong like a brown bear, fast like a panda, and friendly like Teddy! 10 years of experience in the digital forest.',
    emoji: '❓',
    color: '#A0C4FF',
  },
  Commands: {
    title: 'Our Team',
    description:
      'Diverse like bear species — panda designers, grizzly developers, and polar bear marketers. United by strength and warmth!',
    emoji: '👥',
    color: '#BDB2FF',
  },
};

const About = () => {
  return (
    <section id="about" className={styles.arctic__wrapper}>
      <div className={styles.iceberg__container}>
        <div className={styles.polar__header}>
          <span>Arctic Bearers</span>
          <div className={styles.aurora} />
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
                  '--delay': `${index * 0.2}s`,
                } as React.CSSProperties
              }
              className={`${styles.iceblock} ${styles[`iceblock--${index % 3}`]}`}
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

export default About;
