import classNames from "classnames";
import { Theme } from "../../constants/theme";
import styles from './styles.module.scss';

interface LineProps {
  theme: Theme;
  className?: string;
}

export const Line = ({ className, theme }: LineProps) => {
  theme = theme || Theme.default;
  return <div className={classNames(className, styles[theme], styles.line)}></div>
};
