import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  name?: string;
  className?: string;
}

export const Button = ({
  icon,
  className,
  name,
  ...props
}: ButtonIconProps) => {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      {icon} {name}
    </button>
  );
};
