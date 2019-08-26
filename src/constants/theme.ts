const colors = {
  accent: '#F3534A',
  primary: '#5080F3',
  secondary: '#97A0E8',
  tertiary: '#FFE358',
  black: '#323643',
  white: '#FFFFFF',
  gray: '#9DA3B4',
  gray2: '#C5CCD6',
  green: '#008000',
  pink: '#FF7CB6',
  blue: '#02A4F7',
  orange: '#FF955F',
  purple: '#A0039D',
  indigo: '#7F81FF',
  red: '#FF1E32',
  yellow: '#FFEB0A',
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
  base: 16,
  font: 14,
  radius: 6,
  padding: 25,
  icon: 25,
  margin: 10,

  // font sizes
  h1: 26,
  h2: 20,
  h3: 18,
  title: 18,
  header: 16,
  body: 14,
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
  title: {
    fontSize: sizes.title,
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

enum EvaluationType {
  RELATIONSHIPS = 'relationships',
  ACTIVITIES = 'activities',
  INTAKES = 'intakes',
  OTHER = 'other',
  OVERALL = 'overall',
}

enum Tags {
  FAMILY = 'Family',
  LOVER = 'Lover/Partner',
  FRIENDS = 'Friends',
  WORK = 'Work',
  SOCIAL = 'Social',
  OTHER = 'Other',
}

export { colors, sizes, fonts, gradients, Tags, EvaluationType };
