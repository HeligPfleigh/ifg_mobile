import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
    backgroundColor: theme.colors.white2,
  },
  titleWrapper: {
    marginTop: theme.sizes.margin,
    marginBottom: theme.sizes.margin,
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: theme.sizes.h2,
    marginBottom: theme.sizes.margin,
  },
  pageSubtitle: {
    textAlign: 'center',
    fontSize: theme.sizes.label,
    fontWeight: '300',
    marginBottom: theme.sizes.margin,
  },
  fieldLabel: {
    color: theme.colors.gray,
    fontSize: theme.sizes.label,
    marginBottom: theme.sizes.margin,
  },
  textarea: {
    padding: 8,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: theme.sizes.base,
  },
  password: {
    padding: 8,
    paddingTop: 3,
    paddingBottom: 0,
    fontSize: theme.sizes.base,
  },
  btnSend: {
    marginTop: theme.sizes.padding,
    marginBottom: theme.sizes.base,
    backgroundColor: theme.colors.transparent,
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
});
