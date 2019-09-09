import { StyleSheet } from 'react-native';
import { theme } from '../../../constants';

export default StyleSheet.create({
  container: {
    marginBottom: theme.sizes.margin * 0.7,
  },
  label: {
    color: theme.colors.gray,
    fontSize: theme.sizes.label,
    marginBottom: theme.sizes.margin * 0.5,
  },
});
