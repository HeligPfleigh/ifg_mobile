import { theme } from "../constants";
const me = () => {
    return Promise.resolve({
        name: "Test User",
        avatar: null,
        score: {
            relationships: 3.6,
            activities: -2.5,
            intakes: 1.8,
            other: 3.6,
            overall: 4.5,
        }
    })
};

const getSummary = (type: theme.EvaluationType) => {
    switch(type) {
        case theme.EvaluationType.RELATIONSHIPS:
            return Promise.resolve({
                score: 1.8,
                affections: [
                    {
                        factors: ["Johny"],
                        tags: theme.Tags.FAMILY,
                        score: 5,
                    },
                    {
                        factors: ["Sam"],
                        tags: theme.Tags.LOVER,
                        score: 3,
                    },
                    {
                        factors: ["My neighbour"],
                        tags: theme.Tags.OTHER,
                        score: 1,
                    },
                    {
                        factors: ["Jenny"],
                        tags: theme.Tags.WORK,
                        score: -1,
                    },
                    {
                        factors: ["Boss"],
                        tags: theme.Tags.WORK,
                        score: -3,
                    },
                ]
            });
        default:
            return Promise.resolve({
                score: 4.5,
                affections: [
                    {
                        factors: ["Reading", "Cooking", "My sister"],
                        tags: null,
                        score: 5,
                    },
                    {
                        factors: ["Take naps"],
                        tags: null,
                        score: 3,
                    }
                ]
            })
    }
}

export default {
    me,
    getSummary
}