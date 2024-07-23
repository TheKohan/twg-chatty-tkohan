const FONT_PATH = '../../assets/fonts';

export const fontAssets = {
  'Poppins-Bold': require(`${FONT_PATH}/Poppins-Bold.ttf`),
  'Poppins-Regular': require(`${FONT_PATH}/Poppins-Regular.ttf`),
  'Poppins-SemiBold': require(`${FONT_PATH}/Poppins-SemiBold.ttf`),
  'Poppins-Medium': require(`${FONT_PATH}/Poppins-Medium.ttf`),
} as const;
