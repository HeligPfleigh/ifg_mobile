import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: theme.sizes.margin * 2,
    paddingRight: theme.sizes.margin * 2,
    paddingBottom: theme.sizes.margin * 2,
    backgroundColor: theme.colors.white2,
  },
  avatar: {
    height: 120,
    width: 120,
    padding: 20,
    borderRadius: 60,
    backgroundColor: theme.colors.secondary,
    marginTop: theme.sizes.padding,
  },
  content: {
    paddingTop: theme.sizes.base,
    backgroundColor: theme.colors.transparent,
  },
  label: {
    color: theme.colors.black,
  },
  btnSend: {
    backgroundColor: theme.colors.transparent,
    marginTop: theme.sizes.padding,
    marginBottom: theme.sizes.base,
  },
  labelSend: {
    color: theme.colors.white,
  },
  btnCancel: {
    padding: 2,
    backgroundColor: theme.colors.transparent,
  },
  btnCancelBody: {
    backgroundColor: theme.colors.white2,
    borderRadius: theme.sizes.radius - 1,
  },
  txtCancel: {
    color: theme.colors.primary,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  edit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
