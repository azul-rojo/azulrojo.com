import classNames from "classnames";
import styles from "./styles.module.scss";
import { Theme, DEFAULT_THEME } from "../../constants/theme";

interface HamburgerButtonProps {
  toggle: boolean;
  onClick: () => unknown
  theme: Theme;
}

const Line = () => {
  return <span />
}

export const HamburgerButton = ({ toggle, onClick, theme }: HamburgerButtonProps) => {
  theme = theme || DEFAULT_THEME;

  const _onClick = () => {
    onClick();
  };

  return (
    <div
      id="hamburger-button"
      onClick={_onClick}
      className={classNames(
        styles.hamburgerButton,
        styles[theme],
        {
        [styles.isToggled]: toggle,
        [styles.isNotToggled]: !toggle,
      })}
    >
      <Line />
      <Line />
    </div>
  );
};
