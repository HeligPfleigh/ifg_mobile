import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
    backgroundColor: theme.colors.white,
  },
  pageTitle: {
    textAlign: 'center',
    fontSize: theme.sizes.h2,
  },
  fieldWrapper: {
    marginTop: theme.sizes.margin,
    marginBottom: theme.sizes.margin,
  },
  fieldLabel: {
    color: theme.colors.gray,
    fontSize: theme.sizes.label,
    marginBottom: theme.sizes.margin,
  },
  btnSend: {
    marginBottom: theme.sizes.margin / 2,
  },
  labelSend: {
    color: theme.colors.white,
  },
  btnCancel: {
    borderColor: theme.colors.blue,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
