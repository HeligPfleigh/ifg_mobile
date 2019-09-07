import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingTop: Platform.OS === 'ios' ? 35 : 15,
  },
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
  name: {
    fontWeight: '600',
    color: theme.colors.black,
    fontSize: theme.sizes.base,
  },
  headerNav: {
    position: 'absolute',
    right: theme.sizes.zero,
    bottom: theme.sizes.zero,
  },
  content: {
    paddingTop: theme.sizes.padding,
    backgroundColor: theme.colors.gray2,
  },
});
