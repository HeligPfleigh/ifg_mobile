import { StyleSheet } from 'react-native';
import { theme } from '../../../../../constants';

export default StyleSheet.create({
  container: {
    padding: theme.sizes.margin * 2,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  label: {
    color: theme.colors.black,
  },
});
