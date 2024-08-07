export const colors = {
  plum500: '#5603AD',
  plum700: '#390273',
  plum300: '#993AFC',
  plum200: '#C692FD',
  blue500: '#259DFA',
  blue300: '#B6DEFD',
  blue100: '#F0F8FF',
  gray500: '#9FA2B2',
  gray300: '#BFC1CC',
  gray100: '#E9EAEE',
  white: '#FFFFFF',
  black: '#1A1A1A',
  active: '#A8FF76',
  error: '#FF445A',
} as const;

export type ColorVariant = keyof typeof colors;
