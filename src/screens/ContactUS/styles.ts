import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export default StyleSheet.create({
  container: {
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
    backgroundColor: theme.colors.white,
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: theme.sizes.h2,
  },
  name: {
    fontSize: theme.sizes.font,
    marginBottom: theme.sizes.margin / 2,
    color: theme.colors.gray,
  },
  input: {
    height: 40,
    borderColor: theme.colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    width: '100%',
    paddingHorizontal: theme.sizes.margin / 2,
  },
  content: {
    paddingTop: theme.sizes.padding,
    backgroundColor: theme.colors.transparent,
  },
  label: {
    color: theme.colors.black,
  },
});
