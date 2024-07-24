import { TextStyle } from 'react-native';

const FONT_PATH = '../../assets/fonts';

export const fontAssets = {
  'Poppins-Bold': require(`${FONT_PATH}/Poppins-Bold.ttf`),
  'Poppins-Regular': require(`${FONT_PATH}/Poppins-Regular.ttf`),
  'Poppins-SemiBold': require(`${FONT_PATH}/Poppins-SemiBold.ttf`),
  'Poppins-Medium': require(`${FONT_PATH}/Poppins-Medium.ttf`),
  'SF-Compact-Display-Regular': require(`${FONT_PATH}/SFCompactDisplay-Regular.otf`),
  'SF-Compact-Display-Bold': require(`${FONT_PATH}/SFCompactDisplay-Bold.otf`),
  'SF-Compact-Text-Regular': require(`${FONT_PATH}/SFCompactText-Regular.otf`),
} as const;

type Fonts = keyof typeof fontAssets;

export const typography = {
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 36,
  },
  h2: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
  },
  h3: {
    fontFamily: 'Poppins-Bold',
    fontSize: 22,
  },
  h4: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  button: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    letterSpacing: 1,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  titleInput: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    lineHeight: 20,
  },
  caption: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    lineHeight: 10,
  },
  bodyText: {
    fontFamily: 'SF-Compact-Text-Regular',
    fontWeight: 'thin',
    fontSize: 14,
  },
  captionText: {
    fontFamily: 'SF-Compact-Display-Bold',
    fontSize: 12,
    lineHeight: 16,
  },
  specialText: {
    fontFamily: 'SF-Compact-Display-Regular',
    fontSize: 12,
    lineHeight: 16,
  },
} satisfies Record<
  string,
  Omit<TextStyle, 'fontFamily'> & { fontFamily: Fonts }
>;

export type TypographyVariant = keyof typeof typography;
