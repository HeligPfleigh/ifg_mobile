import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  header: {
    flex: 1,
    padding: theme.sizes.padding,
    backgroundColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 40,
    backgroundColor: theme.colors.white,
    marginRight: theme.sizes.margin,
  },
  content: {
    paddingTop: theme.sizes.padding,
    backgroundColor: theme.colors.gray2,
  },
});
