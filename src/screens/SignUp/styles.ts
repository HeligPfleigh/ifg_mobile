import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  container: { marginLeft: theme.sizes.padding, marginRight: theme.sizes.padding },
  title: {
    fontSize: theme.sizes.h1 + 5,
  },
  button: {
    marginBottom: theme.sizes.margin,
  },
  disableSignUp: {
    backgroundColor: theme.colors.gray2,
  },
  textButton: {
    color: theme.colors.white,
    fontSize: theme.sizes.h2,
  },
  confirm: {
    marginTop: theme.sizes.padding,
    marginBottom: theme.sizes.padding,
    flexDirection: 'row',
    alignItems: 'center',
    aspectRatio: 6.5,
    flexWrap: 'wrap',
    width: '100%',
  },
  box: { marginRight: 5 },
  textConfirm: {
    fontSize: theme.sizes.h3,
  },
  textLink: {
    color: theme.colors.primary,
    fontSize: theme.sizes.h3,
  },
  contact: {
    aspectRatio: 5.5,
  },
});
