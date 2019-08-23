import { theme } from "../constants";
const me = () => {
    return Promise.resolve({
        name: "Test User",
        avatar: null,
        score: {
            relationships: 3.6,
            activities: 2.5,
            intakes: 1.8,
            other: 3.6,
            overall: 4.5,
        }
    })
};

const getSummary = (type: theme.EvaluationType) => {
    return Promise.resolve({
        score: 4.5,
        affections: [
            {
                factors: ["Johny", "Logan"],
                tags: theme.tags.Family,
                score: 4,
            },
            {
                factors: ["Sam"],
                tags: theme.tags.Lover,
                score: 4,
            },
            {
                factors: ["Reading", "Cooking", "Take naps"],
                tags: [],
                score: 3,
            }
        ]
    })
}

export default {
    me,
    getSummary
}