import { Theme } from "@/constants/theme";
import classNames from 'classnames';
import styles from './styles.module.scss';
import { ReactNode } from "react";

// TODO: style these components. right now its just basic styled with theme colors

interface ListProps {
  className?: string;
  theme: Theme;
  children: ReactNode;
}
export function ListItem({ children, className, theme }: ListProps) {
  const classes = classNames(className, styles[theme]);

  return <li className={classes}>{children}</li>
}

interface UnorderListProps {
  className?: string;
  theme: Theme;
  children: ReactNode;
}

export function UnorderList({ children, className, theme }: UnorderListProps) {
  const classes = classNames(className, styles[theme]);

  return <ul className={classes}>{children}</ul>
}
