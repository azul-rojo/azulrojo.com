import { Heading } from "../Heading";
import styles from './styles.module.scss';
import classNames from "classnames";
import { HamburgerButton } from "../HamburgerButton";
import { Theme } from "../../constants/theme";
import { AppLink, LinkBase } from "../Link";
import { Line } from "../Line";

export interface Navbar {
  title: string;
  // TODO: this should do something
  showDrafts: boolean;
  sections: MenuSection[];
}

export interface MenuSection {
  title: string;
  links: {
    text: string;
    href: string;
  } [];
}

export interface MenuProps {
  title: string;
  theme: Theme;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  linkSections: MenuSection[];
}

export const Menu = ({ isOpen, linkSections, setIsOpen, theme, title } : MenuProps) => {

  return (
    <>
      <HamburgerButton toggle={isOpen} onClick={() => setIsOpen(!isOpen)} theme={theme} />
      <div className={classNames(styles.menu, styles[theme], { [styles.open]: isOpen })}>
        <Heading className={styles.title} headingType="h3" theme={theme}>{title}</Heading>
        {linkSections.map((section, index) => {
          const { title: sectionName, links } = section;
          const sectionKey = `${section}-${index}`;
          const isLastSection = index === linkSections.length - 1;

          return (
            <div key={sectionKey} className={styles.section}>
              {sectionName && <Heading headingType='h5' className={styles.sectionHeading} theme={theme}>{sectionName}</Heading>}
              {links.map((linkProps, linkIndex) => {
                const linkKey = sectionKey + linkIndex;
                const { href, text } = linkProps;

                return (
                  <div className={styles.linkWrapper} key={"link-" + linkIndex}>
                    <AppLink
                      href={href}
                      theme={theme}
                      key={linkKey}
                      className={styles.link}
                      onClick={() => { setIsOpen(false); }}>
                        {text}
                      </AppLink>
                  </div>
                )
              })}
              {!isLastSection && <Line theme={theme}/>}
            </div>
          )
        })}
      </div>
      {isOpen && <div className={styles.openLayout} onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
