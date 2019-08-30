import { StyleSheet } from 'react-native';
import { theme } from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 65,
  },
  content: {
    flex: 1,
    maxHeight: 55,
    marginTop: theme.sizes.margin,
    padding: theme.sizes.margin,
    paddingLeft: theme.sizes.margin * 2,
    paddingRight: theme.sizes.margin * 2,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  roundContainer: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1.3,
    borderColor: theme.colors.blue,
    backgroundColor: 'transparent',
  },
  label: {
    fontWeight: '600',
    color: theme.colors.black,
    fontSize: theme.sizes.header,
  },
});
