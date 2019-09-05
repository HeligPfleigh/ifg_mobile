import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  header: {
    shadowOpacity: 0,
    borderBottomWidth: 0,
    backgroundColor: theme.colors.white,
    paddingLeft: theme.sizes.padding,
    paddingRight: theme.sizes.padding,
  },
  flag: {
    marginRight: theme.sizes.base,
  },
});
