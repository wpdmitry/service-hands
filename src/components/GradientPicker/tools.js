import tinycolor from 'tinycolor2';

export const isValidColors = (...colors) =>
  colors.map(tinycolor).every(testColor => testColor.isValid());

export const toHex = color => tinycolor(color).toHexString();

/* Opera 15+, Chrome 25+, IE 10+, Firefox 16+, Safari 6.1+, iOS 7+, Android 4.4+ */
export const format = (color1, color2) =>
  `linear-gradient(${color1}, ${color2})`;

export const getRandomColor = () => tinycolor.random().toHexString();
