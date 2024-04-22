import { createContext } from 'react';
import { Theme } from './constants/theme';

interface Context {
  theme: Theme;
  toggleTheme: (theme: Theme | 'System') => void
}

export const initialContext: Context = {
  theme: Theme.dark,
  toggleTheme: () => {}
}

export const GlobalContext = createContext(initialContext);
