import classNames from 'classnames';
import styles from './styles.module.scss';

interface SectionProps {
  children: JSX.Element;
  className?: string;
  id?: string;
}

const Section = ({ children, className, id }: SectionProps) => {
  return <section className={classNames(styles.section, className)} id={id}>
    {children}
  </section>
};

export default Section;