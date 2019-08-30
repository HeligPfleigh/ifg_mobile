import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: theme.sizes.margin * 2,
    paddingRight: theme.sizes.margin * 2,
    paddingBottom: theme.sizes.margin * 2,
    backgroundColor: theme.colors.white,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.sizes.base,
    backgroundColor: theme.colors.transparent,
  },
  avatar: {
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 40,
    backgroundColor: theme.colors.white,
  },
  content: {
    paddingTop: theme.sizes.base,
    backgroundColor: theme.colors.transparent,
  },
  label: {
    color: theme.colors.black,
  },
});
