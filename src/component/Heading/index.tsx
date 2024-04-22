import { createElement } from "react";
import classNames from "classnames";
import styles from './styles.module.scss';
import { DEFAULT_THEME, Theme } from "../../constants/theme";

interface HeadingProps {
  className?: string;
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  theme?: Theme;
}

export const Heading = ({ className, headingType, children, theme }: HeadingProps) => {
  theme = theme || DEFAULT_THEME;
  headingType = headingType || 'h1';
  const headingClassNames = classNames(className, styles.heading, styles[theme]); 

  return createElement(
    headingType,
    { className: headingClassNames },
    children
  );
};
