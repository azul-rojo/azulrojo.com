import classNames from 'classnames';
import { Theme } from '../../constants/theme';
import styles from './styles.module.scss';

interface TextProps {
  className?: string;
  children: React.ReactNode;
  theme?: Theme;
}

export const Text = ({ children, className, theme }: TextProps) => { 
  theme = theme || Theme.default;

  return (
    <p className={classNames(className, styles.text, styles[theme])}>
      {children}
    </p>
  );
};
