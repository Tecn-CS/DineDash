import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex-center" style={{ gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '12px', background: 'var(--color-bg-surface)', border: '1px solid var(--color-glass-border)', width: 'fit-content' }}>
      <Sun size={14} color={theme === 'light' ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
      <button 
        onClick={toggleTheme}
        style={{
          width: '40px',
          height: '20px',
          borderRadius: '20px',
          background: theme === 'light' ? '#e2e8f0' : 'var(--color-primary)',
          position: 'relative',
          border: 'none',
          cursor: 'pointer',
          transition: '0.3s'
        }}
      >
        <div 
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: 'white',
            position: 'absolute',
            top: '2px',
            left: theme === 'light' ? '2px' : '22px',
            transition: '0.3s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        />
      </button>
      <Moon size={14} color={theme === 'dark' ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
    </div>
  );
}
