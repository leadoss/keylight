export const theme = {
  colors: {
    accent: '#FFD400',
    black: '#0A0A0A',
    white: '#FFFFFF',
    grayLight: '#F5F5F5',
    grayMid: '#888888',
    grayDark: '#222222',
  },
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
  },
  easing: {
    smooth: [0.25, 0.46, 0.45, 0.94] as const,
    spring: { type: 'spring', stiffness: 100, damping: 30 },
    entrance: [0.16, 1, 0.3, 1] as const,
  },
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    extraSlow: 1.4,
  },
} as const;

export const containerClasses = 'mx-auto px-6 md:px-12 lg:px-16 max-w-[1440px]';
