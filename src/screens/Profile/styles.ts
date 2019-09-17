import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.secondary,
    paddingTop: Platform.OS === 'ios' ? 35 : 15,
  },
  header: {
    backgroundColor: theme.colors.secondary,
    padding: 25,
  },
  avatar: {
    padding: 8,
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.blue2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },

  name: {
    fontWeight: '600',
    color: theme.colors.black,
    fontSize: theme.sizes.h1,
  },
  headerNav: {
    position: 'absolute',
    right: theme.sizes.zero,
  },
  content: {
    paddingTop: theme.sizes.padding,
    backgroundColor: theme.colors.white2,
  },
});
