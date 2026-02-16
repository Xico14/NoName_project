export const shadows = {
  none: 'none',
  sm: '0 1px 2px rgba(15, 23, 42, 0.08)',
  md: '0 6px 16px rgba(15, 23, 42, 0.12)',
  lg: '0 14px 32px rgba(15, 23, 42, 0.16)',
  xl: '0 24px 48px rgba(15, 23, 42, 0.2)',
  focusRing: '0 0 0 2px rgba(37, 99, 235, 0.65)',
  glass: '0 8px 24px rgba(15, 23, 42, 0.14)',
} as const;

export type Shadows = typeof shadows;
