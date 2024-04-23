import { Menu, MenuSection } from "@/component/Menu";
import React from "react";
import classNames from "classnames";
import styles from './styles.module.scss';
import { GlobalContext } from '@/GlobalContext';
import { useTheme } from "@/hooks/useTheme";

interface LayoutProps {
  children: React.ReactNode;
  menuTitle: string;
  linkSections: MenuSection[];
}

export function Layout({
  children,
  menuTitle,
  linkSections,
}: Readonly<LayoutProps>) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <GlobalContext.Provider value={{ theme, toggleTheme }}>
      <main className={classNames(styles.app, styles[theme])}>
        <Menu
          title={menuTitle}
          linkSections={linkSections}
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
