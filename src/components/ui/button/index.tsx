import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

import styles from './styles.module.scss';

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  name?: string;
  className?: string;
}

const Button = ({ icon, className, name, ...props }: ButtonIconProps) => {
  return (
    <button type="button" className={clsx(styles.button, className)} {...props}>
      {icon} {name}
    </button>
  );
};

export default Button;
