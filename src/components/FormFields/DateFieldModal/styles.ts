import { StyleSheet } from 'react-native';
import { theme } from '../../../constants';

export default StyleSheet.create({
  container: {
    marginBottom: theme.sizes.margin,
  },
  label: {
    color: theme.colors.gray,
    fontSize: theme.sizes.label,
    marginBottom: theme.sizes.margin,
  },
  underlineTextContainer: {
    borderBottomWidth: 0.35,
    borderColor: theme.colors.underline,
  },
  content: {
    paddingBottom: 5,
    fontSize: theme.sizes.header,
    lineHeight: theme.sizes.header,
  },
});
