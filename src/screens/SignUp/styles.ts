import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  container: { marginLeft: theme.sizes.padding, marginRight: theme.sizes.padding },
  title: {
    fontSize: theme.sizes.h1 + 8,
  },
  textButton: {
    color: theme.colors.white,
    fontSize: theme.sizes.h2,
  },
  confirm: { flexDirection: 'row', alignItems: 'center', aspectRatio: 6.5 },
  box: { marginRight: 5 },
  textConfirm: {
    fontSize: theme.sizes.h3,
  },
  textLink: {
    color: theme.colors.primary,
    fontSize: theme.sizes.h3,
  },
});
