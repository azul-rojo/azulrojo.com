import { Menu } from "@/component/Menu";
import { MENU_PROPS } from "@/constants/menu";
import React from "react";
import classNames from "classnames";
import styles from './styles.module.scss';
import { GlobalContext } from '@/GlobalContext';
import { useTheme } from "@/hooks/useTheme";

export function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <GlobalContext.Provider value={{ theme, toggleTheme }}>
      <main className={classNames(styles.app, styles[theme])}>
        <Menu
          {...MENU_PROPS}
          theme={theme}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
          <div className={classNames(styles.main, styles[theme], {[styles.isOpen]: isOpen})}>
            {children}
          </div>
      </main>
    </GlobalContext.Provider>
  );
}
