import { forwardRef } from 'react';
import styles from './styles.module.scss';
import clasnames from 'classnames';

export interface CardProps {
  buttonLink: string;
  buttonText?: string;
  className?: string;
  description: string;
  id?: string;
  imageAlt?: string;
  title: string;
}

interface CardHeadingProps {
  children: string
}
const CardHeading = ({ children }: CardHeadingProps) => {
  return (
    <h1 className={styles.cardHeading}>
      {children}
    </h1>
  );
}

// A card for a page to take up the whole space whiles looking good!
export const SectionCard = forwardRef<HTMLDivElement, CardProps>(({ className, id, title, description, buttonLink, buttonText='View' }: CardProps, ref) => {
  return (
    <div className={clasnames(className, styles.sectionCard)} id={id} ref={ref} >
      <div className={styles.headingPanel}>
        <CardHeading>
          {title}
        </CardHeading>
      </div>
      <div className={styles.descriptionPanel}>
        <p className={styles.description}>{description}</p>
        <div className={styles.line}></div>
        <a href={buttonLink} className={clasnames(styles.linkButton, className)}>
          {buttonText}
        </a>
      </div>
    </div>
  );
});
