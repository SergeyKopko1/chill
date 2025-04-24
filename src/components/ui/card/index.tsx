import { FC } from 'react';

import styles from './styles.module.scss';

interface ICardProps {
  title: React.ReactNode; // Changed from string to React.ReactNode
  description: string;
  animation?: string;
  style?: React.CSSProperties; // Added to support style prop
  className?: string; // Added to support className prop
}

const Card: FC<ICardProps> = ({
  title,
  description,
  animation,
  style,
  className,
}) => {
  return (
    <div
      className={`${styles.wrapper_container} ${className || ''}`}
      style={style}
    >
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
      {animation && <div>{animation}</div>}
    </div>
  );
};

export default Card;
