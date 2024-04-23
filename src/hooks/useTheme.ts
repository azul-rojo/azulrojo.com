import { useEffect, useState } from "react";
import { Theme } from "../constants/theme";

type Colors = { dark: string, light: string; }

// const isSystemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
const LIGHT_THEME_COLOR = 'rgb(248, 249, 250)';
const DARK_THEME_COLOR = 'rgb(28, 28, 28)';


const setWholeTheme = (theme: Theme, colors: Colors, setTheme: React.Dispatch<React.SetStateAction<Theme>>) => {
  const selectedColor = theme === Theme.dark ? colors.dark : colors.light;
  document.querySelector("meta[name='theme-color']")?.setAttribute('content', selectedColor);
  document.body.style.backgroundColor = selectedColor;
  setTheme(theme);
}

export function useTheme(colors: Colors = { dark: DARK_THEME_COLOR, light: LIGHT_THEME_COLOR }) {
  const [theme, setTheme] = useState<Theme>(Theme.dark)
  const [isSetBySystem, setIsSetBySystem] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isSystemDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
      const defaultSystemColor = isSystemDarkTheme.matches ? DARK_THEME_COLOR : LIGHT_THEME_COLOR;;
      document.querySelector("meta[name='theme-color']")?.setAttribute('content', defaultSystemColor);
      document.body.style.backgroundColor = defaultSystemColor;
      setTheme(isSystemDarkTheme.matches ? Theme.dark : Theme.light)

      const setNextSystemTheme = ({ matches }: { matches: boolean}) => {
        if (isSetBySystem) {
          const themeSet = matches ? Theme.dark : Theme.light;
          setWholeTheme(themeSet, colors, setTheme);
        }
      }
  
      isSystemDarkTheme.addEventListener('change', setNextSystemTheme);
  
      return () => isSystemDarkTheme.removeEventListener('change', setNextSystemTheme);
     }
  }, [isSetBySystem, setIsSetBySystem, colors]);


  const toggleTheme = (theme: Theme | 'System') => {
    if (theme === 'System') {
      setIsSetBySystem(true);
    } else {
      setWholeTheme(theme, colors, setTheme);
      setIsSetBySystem(false);
    }
  }

  return { theme, toggleTheme };
}
