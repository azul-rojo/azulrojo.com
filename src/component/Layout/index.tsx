import { Menu, MenuSection } from "@/component/Menu";
import React from "react";
import classNames from "classnames";
import styles from './styles.module.scss';
import { GlobalContext } from '@/GlobalContext';
import { useTheme } from "@/hooks/useTheme";
import { AppLink } from "../Link";

interface LayoutProps {
  children: React.ReactNode;
  menuTitle: string;
  linkSections: MenuSection[];
  pageSource: string;
}

export function Layout({
  children,
  menuTitle,
  linkSections,
  pageSource
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
          <footer className={styles.footer}>
            <AppLink href={pageSource} theme={theme}>
              Edit this Page
            </AppLink>
          </footer>
        </div>
      </main>
    </GlobalContext.Provider>
  );
}
