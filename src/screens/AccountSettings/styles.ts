import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray3,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
