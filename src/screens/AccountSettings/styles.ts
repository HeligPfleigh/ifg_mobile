import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white2,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: theme.colors.transparent,
  },
});
