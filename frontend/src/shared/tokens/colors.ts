export const colors = {
  brand: {
    50: '#EEF3FF',
    100: '#D9E5FF',
    200: '#B3CCFF',
    300: '#8CB2FF',
    400: '#6699FF',
    500: '#5B8CFF',
    600: '#4A70E0',
    700: '#3754B5',
    800: '#263A80',
    900: '#182552',
  },
  neutral: {
    0: '#FFFFFF',
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
  semantic: {
    info: '#0EA5E9',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
  },
  text: {
    primary: '#0F172A',
    secondary: '#334155',
    muted: '#64748B',
    inverse: '#FFFFFF',
  },
  background: {
    canvas: '#F8FAFC',
    surface: '#FFFFFF',
    elevated: '#FFFFFF',
    inverse: '#0F172A',
    glassLight: 'rgba(255, 255, 255, 0.7)',
    glassDark: 'rgba(17, 24, 39, 0.56)',
  },
  border: {
    subtle: '#E2E8F0',
    strong: '#94A3B8',
    inverse: 'rgba(255, 255, 255, 0.32)',
    focus: '#2563EB',
  },
  gradient: {
    primary: 'linear-gradient(135deg, #5B8CFF 0%, #7B61FF 45%, #A855F7 100%)',
    accent: 'linear-gradient(135deg, #22D3EE 0%, #3B82F6 100%)',
  },
} as const;

export type Colors = typeof colors;
