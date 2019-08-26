import { StyleSheet } from "react-native";
import { theme } from '../../constants';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.sizes.base,
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    headerTitle: {
        color: theme.colors.black,
        fontSize: theme.sizes.h1,
        fontWeight: "bold",
        marginBottom: theme.sizes.base,
    },
    headerBody: {
        fontSize: theme.sizes.h2,
        textAlign: "center",
    },
    leftContainer: {
        borderRightColor: theme.colors.blue,
        borderRightWidth: StyleSheet.hairlineWidth,
    },
    rightMiddleContainer: {
        borderColor: theme.colors.blue,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderTopWidth: StyleSheet.hairlineWidth,
    }
});
