import classNames from 'classnames';
import Link from 'next/link'
import { Theme } from '../../constants/theme';
import styles from './styles.module.scss';

export interface LinkBase {
  href: string;
  children: React.ReactNode;
  isInternal?: boolean;
}

export type LinkProps = LinkBase & {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
  theme: Theme;
}

export const AppLink = ({ children, className, href, isInternal, onClick, theme }: LinkProps) => { 
  isInternal = isInternal || false;
  const classes = classNames(styles.link, className, styles[theme]);

  if (isInternal) {
    return <Link className={classes} href={href} onClick={onClick}>{children}</Link>;
  } else {
    return <a className={classes} href={href} onClick={onClick}>{children}</a>;
  }
};
