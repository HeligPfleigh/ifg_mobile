import { StyleSheet } from "react-native";
import { theme } from '../../constants';

export const styles = StyleSheet.create({
    header: {
        color: theme.colors.primary,
        fontSize: theme.sizes.h1,
        fontWeight: "bold",
    },
    paragraph: {
        fontSize: theme.sizes.h2,
    },
    textBtn: {
        fontSize: theme.sizes.h2,
    }
})