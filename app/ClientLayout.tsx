'use client';

import React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from '@/components/Navbar';
import { useNotifications } from '@/hooks/useNotifications';
import { Log } from '@/lib/logger';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',    
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#8b5cf6',    
      light: '#a78bfa',
      dark: '#7c3aed',
    },
    error: {
      main: '#f43f5e',    
    },
    warning: {
      main: '#f59e0b',    
    },
    success: {
      main: '#10b981',    
    },
    background: {
      default: '#030712', 
      paper: 'rgba(255,255,255,0.02)',
    },
    text: {
      primary: '#f8fafc',
      secondary: 'rgba(255,255,255,0.6)',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontWeight: 400, letterSpacing: '0.01em' },
    body2: { fontWeight: 400, letterSpacing: '0.01em' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 700,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 16px',
        },
      },
    },
  },
});

function LayoutInner({ children }: { children: React.ReactNode }) {
  Log('frontend', 'debug', 'component', 'ClientLayout LayoutInner render');

  
  const { unreadCount } = useNotifications({ limit: 100 });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        
        background: '#030712',
        position: 'relative',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {}
      <Box
        className="ambient-glow"
        sx={{
          position: 'fixed',
          top: '-20%',
          left: '-10%',
          width: '140%',
          height: '140%',
          background: 
            'radial-gradient(circle at 15% 20%, rgba(99, 102, 241, 0.08) 0%, transparent 40%), ' +
            'radial-gradient(circle at 85% 30%, rgba(139, 92, 246, 0.06) 0%, transparent 40%), ' +
            'radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />

      {}
      <Navbar unreadCount={unreadCount} />

      {}
      <Box
        component="main"
        sx={{
          position: 'relative',
          zIndex: 1,
          minHeight: 'calc(100vh - 72px)', 
          pb: 8,
          pt: 3, 
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  Log('frontend', 'debug', 'component', 'ClientLayout render');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutInner>{children}</LayoutInner>
    </ThemeProvider>
  );
}
