import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondary,
  },
  headerContainer: {
    flex: 1,
    padding: theme.sizes.padding,
  },
  avatar: {
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 40,
    backgroundColor: theme.colors.white,
  },
  name: {
    textAlign: 'center',
  },
  content: {
    backgroundColor: theme.colors.white2,
  },
  detail: {
    fontSize: theme.sizes.font,
    color: theme.colors.gray,
  },
  tour: {
    position: 'absolute',
    bottom: -50,
    width: 100,
    height: 50,
    alignSelf: 'center',
  },
});
