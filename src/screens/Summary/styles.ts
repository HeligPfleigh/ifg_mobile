import { StyleSheet } from "react-native";
import { theme } from '../../constants';

export const styles = StyleSheet.create({
    itemContainer: {
        marginVertical: theme.sizes.margin,
        marginHorizontal: theme.sizes.padding,
        padding: theme.sizes.margin,
        borderBottomColor: theme.colors.gray2,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    chip: {
        backgroundColor: theme.colors.white,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.gray2,
    }
});
