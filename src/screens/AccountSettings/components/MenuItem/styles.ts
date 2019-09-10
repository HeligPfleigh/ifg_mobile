import { StyleSheet } from 'react-native';
import { theme } from '../../../../constants';

export default StyleSheet.create({
  container: {
    height: 55,
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
    elevation: 5,
  },
  label: {
    fontWeight: '600',
    color: theme.colors.black,
    fontSize: theme.sizes.header,
  },
});
