// this component defines the padding for the page view
import classNames from 'classnames';
import { Theme } from '../../constants/theme';
import styles from './styles.module.scss';


interface PageProps {
  children: React.ReactNode;
  className?: string;
  theme?: Theme;
}

export const Page = ({ children, className, theme }: PageProps) => {
  theme = theme || Theme.default;

  return <main className={classNames(className, styles.page, styles[theme])}>{children}</main>
}
