import { Button } from "./ui/button";
import { Palette, Crown, Sword, Compass, Flame, Heart, Zap, Waves } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Check } from "lucide-react";

export const themes = {
  luffy: {
    primary: '#ef4444',        // Bright red
    secondary: '#fbbf24',      // Golden yellow
    accent: '#f97316',         // Bright orange
    bg: '#2d3748',             // Softer dark gray
    bgSecondary: '#4a5568',    // Medium gray
    cardBg: '#718096',         // Light gray-blue
    text: '#ffffff',           // Pure white text
    textLight: '#e2e8f0',      // Very light gray
    border: '#718096',         // Medium gray border
  },
  zoro: {
    primary: '#22c55e',        // Bright green
    secondary: '#84cc16',      // Lime green
    accent: '#10b981',         // Emerald
    bg: '#2d3748',             // Softer dark gray
    bgSecondary: '#4a5568',    // Medium gray
    cardBg: '#718096',         // Light gray-blue
    text: '#ffffff',           // Pure white text
    textLight: '#e2e8f0',      // Very light gray
    border: '#718096',         // Medium gray border
  },
  nami: {
    primary: '#f97316',        // Bright orange
    secondary: '#3b82f6',      // Blue
    accent: '#fb923c',         // Light orange
    bg: '#2d3748',             // Softer dark gray
    bgSecondary: '#4a5568',    // Medium gray
    cardBg: '#718096',         // Light gray-blue
    text: '#ffffff',           // Pure white text
    textLight: '#e2e8f0',      // Very light gray
    border: '#718096',         // Medium gray border
  },
  sanji: {
    primary: '#60a5fa',        // Bright blue
    secondary: '#fbbf24',      // Gold
    accent: '#3b82f6',         // Blue accent
    bg: '#1e293b',             // Dark blue-gray
    bgSecondary: '#334155',    // Medium dark
    cardBg: '#475569',         // Soft gray
    text: '#ffffff',           // Pure white text
    textLight: '#e2e8f0',      // Very light gray
    border: '#64748b',         // Gray border
  },
  chopper: {
    primary: '#ec4899',        // Bright pink
    secondary: '#a855f7',      // Purple
    accent: '#f472b6',         // Light pink
    bg: '#2d3748',             // Softer dark gray
    bgSecondary: '#4a5568',    // Medium gray
    cardBg: '#718096',         // Light gray-blue
    text: '#ffffff',           // Pure white text
    textLight: '#e2e8f0',      // Very light gray
    border: '#718096',         // Medium gray border
  },
  ace: {
    primary: '#f97316',        // Fire orange
    secondary: '#fbbf24',      // Golden yellow
    accent: '#ef4444',         // Red
    bg: '#2d3748',             // Softer dark gray
    bgSecondary: '#4a5568',    // Medium gray
    cardBg: '#718096',         // Light gray-blue
    text: '#ffffff',           // Pure white text
    textLight: '#e2e8f0',      // Very light gray
    border: '#718096',         // Medium gray border
  },
  law: {
    primary: '#a78bfa',        // Soft purple
    secondary: '#fbbf24',      // Gold
    accent: '#8b5cf6',         // Purple
    bg: '#2d3748',             // Softer dark gray
    bgSecondary: '#4a5568',    // Medium gray
    cardBg: '#718096',         // Light gray-blue
    text: '#ffffff',           // Pure white text
    textLight: '#e2e8f0',      // Very light gray
    border: '#718096',         // Medium gray border
  },
  grandline: {
    primary: '#06b6d4',        // Cyan
    secondary: '#3b82f6',      // Blue
    accent: '#0ea5e9',         // Sky blue
    bg: '#2d3748',             // Softer dark gray
    bgSecondary: '#4a5568',    // Medium gray
    cardBg: '#718096',         // Light gray-blue
    text: '#ffffff',           // Pure white text
    textLight: '#e2e8f0',      // Very light gray
    border: '#718096',         // Medium gray border
  },
};

export function applyTheme(themeName: string) {
  const theme = themes[themeName as keyof typeof themes] || themes.luffy;
  
  document.documentElement.style.setProperty('--theme-primary', theme.primary);
  document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
  document.documentElement.style.setProperty('--theme-accent', theme.accent);
  document.documentElement.style.setProperty('--theme-bg', theme.bg);
  document.documentElement.style.setProperty('--theme-bg-secondary', theme.bgSecondary);
  document.documentElement.style.setProperty('--theme-card-bg', theme.cardBg);
  document.documentElement.style.setProperty('--theme-text', theme.text);
  document.documentElement.style.setProperty('--theme-text-light', theme.textLight);
  document.documentElement.style.setProperty('--theme-border', theme.border);
}

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const themeOptions = [
    { id: 'luffy', name: 'Luffy', icon: Crown, color: '#ef4444' },
    { id: 'zoro', name: 'Zoro', icon: Sword, color: '#22c55e' },
    { id: 'nami', name: 'Nami', icon: Compass, color: '#f97316' },
    { id: 'sanji', name: 'Sanji', icon: Flame, color: '#60a5fa' },
    { id: 'chopper', name: 'Chopper', icon: Heart, color: '#ec4899' },
    { id: 'ace', name: 'Ace', icon: Flame, color: '#f97316' },
    { id: 'law', name: 'Law', icon: Zap, color: '#a78bfa' },
    { id: 'grandline', name: 'Grand Line', icon: Waves, color: '#06b6d4' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2" style={{ 
          borderColor: 'var(--theme-border)',
          backgroundColor: 'var(--theme-bg-secondary)',
          color: 'var(--theme-text)'
        }}>
          <Palette className="w-4 h-4" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48" style={{ 
        backgroundColor: '#2d3748',
        border: '1px solid #4a5568'
      }}>
        {themeOptions.map((theme) => {
          const IconComponent = theme.icon;
          return (
            <DropdownMenuItem
              key={theme.id}
              onClick={() => onThemeChange(theme.id)}
              className="cursor-pointer py-2 px-3"
              style={{
                backgroundColor: currentTheme === theme.id ? '#4a5568' : 'transparent',
                color: '#ffffff'
              }}
            >
              <div className="flex items-center gap-3 w-full">
                <IconComponent className="w-4 h-4" style={{ color: theme.color }} />
                <span className="font-medium">
                  {theme.name}
                </span>
                {currentTheme === theme.id && (
                  <Check className="w-4 h-4 ml-auto" style={{ color: theme.color }} />
                )}
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
