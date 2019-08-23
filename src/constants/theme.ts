const colors = {
    accent: "#F3534A",
    primary: "#5080F3",
    secondary: "#97A0E8",
    tertiary: "#FFE358",
    black: "#323643",
    white: "#FFFFFF",
    gray: "#9DA3B4",
    gray2: "#C5CCD6",
    green: "#008000",
    pink: '#FF7CB6',
    blue: '#02A4F7',
    orange: '#FF955F',
    purple: '#A0039D',
    indigo: '#7F81FF',
};

const gradients = {
    pink: ['#FFA7DE', '#FF7CB6'],
    blue: ['#89C7FF', '#02A4F7'],
    orange: ['#FFD063', '#FF955F'],
    purple: ['#DFA5FF', '#A0039D'],
    indigo: ['#B0BEFF', '#7F81FF'],
}

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
        fontSize: sizes.h1
    },
    h2: {
        fontSize: sizes.h2
    },
    h3: {
        fontSize: sizes.h3
    },
    header: {
        fontSize: sizes.header
    },
    title: {
        fontSize: sizes.title
    },
    body: {
        fontSize: sizes.body
    },
    caption: {
        fontSize: sizes.caption
    },
    small: {
        fontSize: sizes.base
    }
};

enum EvaluationType {
    RELATIONSHIPS = 'relationships',
    ACTIVITIES = 'activities',
    INTAKES = 'intakes',
    OTHER = 'other',
    OVERALL = 'overall',
};

const tags = {
    Family: 'Family',
    Lover: 'Lover/Partner',
    Friends: 'Friends',
    Work: 'Work',
    Social: 'Social',
    Other: 'Other',
}

export { colors, sizes, fonts, gradients, tags, EvaluationType };