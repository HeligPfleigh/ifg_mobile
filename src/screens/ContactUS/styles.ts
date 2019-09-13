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
    maxHeight: 65,
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: theme.sizes.h2,
    marginBottom: theme.sizes.margin,
  },
  fieldWrapper: {
    marginBottom: theme.sizes.margin,
  },
  fieldLabel: {
    color: theme.colors.gray,
    fontSize: theme.sizes.label,
    marginBottom: theme.sizes.margin,
  },
  textarea: {
    padding: 8,
    paddingTop: 8,
    paddingBottom: 8,
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
});
