// TODO: WIP
import classNames from 'classnames';
import styles from './styles.module.scss';

export interface LinkButtonProps {
  href: string;
  text: string;
  className?: string;
}

interface BaseButtonProps {
  buttonType: 'link' | 'default';
} 

type ButtonProps = BaseButtonProps & LinkButtonProps

export const LinkButton = ({ href, text, className }: LinkButtonProps) => {
  return (
    <a href={href} className={classNames(styles.linkButton, className)}>
      {text}
    </a>
  );
}

const Button = ({ buttonType, ...props }: ButtonProps) => {
  return (<></>)
  
};

export default Button;