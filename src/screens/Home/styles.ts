import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
    paddingTop: Platform.OS === 'ios' ? 35 : 15,
  },
  headerContainer: {
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
    backgroundColor: theme.colors.white2,
  },
  detail: {
    fontSize: theme.sizes.font,
    color: theme.colors.gray,
  },
});
