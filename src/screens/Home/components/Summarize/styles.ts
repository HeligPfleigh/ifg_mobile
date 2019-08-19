import { StyleSheet } from "react-native";
import { theme } from '../../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        maxHeight: 60,
        marginTop: theme.sizes.margin,
        marginBottom: theme.sizes.margin,
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
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
        marginRight: theme.sizes.margin,
    },
    label: {
        color: theme.colors.black,
    },
    score: {
        color: theme.colors.green,
    },
    icon: {
        marginLeft: 1,
        marginTop: 1
    }
});
