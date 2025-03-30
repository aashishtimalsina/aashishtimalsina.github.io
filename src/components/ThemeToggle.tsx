
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Toggle } from './ui/toggle';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle 
      pressed={theme === 'dark'} 
      onPressedChange={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full w-10 h-10 flex items-center justify-center"
    >
      {theme === 'dark' ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
