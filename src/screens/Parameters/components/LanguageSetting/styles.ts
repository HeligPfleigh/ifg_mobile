import { StyleSheet } from 'react-native';
import { theme } from '../../../../constants';

export default StyleSheet.create({
  container: {
    marginTop: theme.sizes.margin,
    padding: theme.sizes.margin,
    paddingLeft: theme.sizes.margin * 2,
    paddingRight: theme.sizes.margin * 2,
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  title: {
    fontWeight: '600',
    lineHeight: 25,
    color: theme.colors.black,
    fontSize: theme.sizes.header,
  },
  subtitle: {
    lineHeight: 20,
    fontWeight: '500',
    color: theme.colors.black,
    fontSize: theme.sizes.body,
  },
  radioGroup: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  radioLabel: {
    lineHeight: 20,
    fontWeight: '300',
    color: theme.colors.black,
    fontSize: theme.sizes.body,
  },
});
