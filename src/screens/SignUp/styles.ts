import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  title: {
    fontSize: theme.sizes.h1 + 8,
  },
  textButton: {
    color: theme.colors.white,
    fontSize: theme.sizes.h2,
  },
  confirm: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  box: { marginRight: 5 },
  textConfirm: {
    fontSize: theme.sizes.h3,
  },
  textLink: {
    color: theme.colors.primary,
    fontSize: theme.sizes.h3,
  },
});
