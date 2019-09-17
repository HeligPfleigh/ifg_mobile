import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  header: {
    color: theme.colors.purple1,
    fontSize: theme.sizes.h1,
    fontWeight: 'bold',
  },
  paragraph: {
    textAlign: 'center',
    color: theme.colors.black,
    marginTop: theme.sizes.margin,
    fontSize: theme.sizes.h3,
  },
  textSignUpBtn: {
    fontSize: theme.sizes.h2,
    color: theme.colors.white,
  },
  textSignInBtn: {
    fontSize: theme.sizes.h2,
    color: theme.colors.primary,
  },
  button: {
    padding: 2,
    backgroundColor: theme.colors.transparent,
  },
  buttonBody: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.sizes.radius - 1,
  },
});
