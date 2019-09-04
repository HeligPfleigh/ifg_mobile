import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
    backgroundColor: theme.colors.white,
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
