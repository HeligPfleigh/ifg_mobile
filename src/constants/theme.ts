const colors = {
  accent: '#F3534A',
  primary: '#5080F3',
  secondary: '#97A0E8',
  tertiary: '#FFE358',
  black: '#323643',
  white: '#FFFFFF',
  white2: '#F4F4F4',
  gray: '#9DA3B4',
  gray2: '#C5CCD6',
  gray3: '#E0E0E0',
  gray4: '#979797',
  gray5: '#4d4d4d',
  green: '#008000',
  pink: '#FF7CB6',
  blue: '#02A4F7',
  blue2: '#6785EC',
  orange: '#FF955F',
  purple: '#A0039D',
  indigo: '#7F81FF',
  red: '#FF1E32',
  yellow: '#FFEB0A',
  purple1: '#8E78E1',
  darkindigo: '#1E53B3',
  transparent: 'transparent',
  underline: 'rgba(0, 0, 0, .38)',
};

const gradients = {
  pink: ['#FFA7DE', '#FF7CB6'],
  blue: ['#89C7FF', '#02A4F7'],
  orange: ['#FFD063', '#FF955F'],
  purple: ['#DFA5FF', '#A0039D'],
  indigo: ['#B0BEFF', '#7F81FF'],
  lightpink: ['#FFF2F9', '#F2CFE1'],
  lightblue: ['#E3F5FF', '#AEDDFD'],
  lightorange: ['#FFF6EC', '#FFDEBD'],
  lightpurple: ['#FCF3FF', '#C1AFEE'],
  lightindigo: ['#F1F2FF', '#AFBAEE'],
};

const sizes = {
  // global sizes
  zero: 0,
  base: 16,
  font: 14,
  radius: 8,
  padding: 25,
  icon: 25,
  innerIcon: 35,
  bigIcon: 50,
  margin: 10,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  header: 16,
  body: 14,
  label: 13,
  caption: 12,
};

const fonts = {
  h1: {
    fontSize: sizes.h1,
  },
  h2: {
    fontSize: sizes.h2,
  },
  h3: {
    fontSize: sizes.h3,
  },
  header: {
    fontSize: sizes.header,
  },
  body: {
    fontSize: sizes.body,
  },
  caption: {
    fontSize: sizes.caption,
  },
  small: {
    fontSize: sizes.base,
  },
};

const scoreSpectrum = [
  '#B10000',
  '#D90606',
  '#F41228',
  '#FF9957',
  '#FFB585',
  '#FFEB0A',
  '#98cf96',
  '#75bf73',
  '#54AF53',
  '#219C20',
  '#056404',
];

const defaultApptourTheme = {
  outerCircleColor: '#3f52ae',
  cancelable: false,
};

export { colors, sizes, fonts, gradients, scoreSpectrum, defaultApptourTheme };
