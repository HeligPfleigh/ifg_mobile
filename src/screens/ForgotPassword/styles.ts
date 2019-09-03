import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  title: {
    fontSize: theme.sizes.h1 + 8,
  },
  paragraph: {
    fontSize: theme.sizes.h2,
  },
  textButton: {
    color: theme.colors.white,
    fontSize: theme.sizes.h2,
  },
});
