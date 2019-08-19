import { StyleSheet } from "react-native";
import { theme } from '../../../../constants';

export const styles = StyleSheet.create({
    container: {
        height: 100,
        marginTop: theme.sizes.margin,
        marginBottom: theme.sizes.margin,
        padding: theme.sizes.margin,
        flexDirection: 'row',
        borderRadius: theme.sizes.base,
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    roundContainer: {
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
    },
    iconContainer: {
        width: 72,
        height: 72,
        backgroundColor: theme.colors.white,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginLeft: theme.sizes.margin,
    },
    header: {
        fontSize: theme.sizes.header,
        marginBottom: theme.sizes.margin,
    },
    detail: {
        fontSize: theme.sizes.font,
        color: 'gray'
    }
});
