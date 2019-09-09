import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  footerContainer: {
    paddingVertical: theme.sizes.margin,
    paddingHorizontal: theme.sizes.padding,
  },
  saveBtn: {
    marginTop: theme.sizes.margin / 2,
  },
  nextBtn: {
    marginBottom: theme.sizes.margin / 2,
  },
  nextBtnTxt: {
    color: theme.colors.white,
  },
  draftBtn: {
    borderColor: theme.colors.blue,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tipSection: {
    paddingHorizontal: theme.sizes.padding,
    justifyContent: 'space-between',
    marginVertical: theme.sizes.margin / 2,
  },
  tip: {
    color: theme.colors.blue,
  },
  smart: {
    fontWeight: 'bold',
  },

  standaloneRowFront: {
    marginVertical: theme.sizes.margin / 2,
    paddingVertical: theme.sizes.margin,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    paddingLeft: theme.sizes.padding,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  standaloneRowBack: {
    marginVertical: theme.sizes.margin / 2,
    alignItems: 'center',
    backgroundColor: theme.colors.darkindigo,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backTextWhite: {
    color: '#FFF',
  },
  btn: {
    width: 50,
    height: '100%',
    backgroundColor: theme.colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indigo: {
    backgroundColor: theme.colors.darkindigo,
  },
  addNewTxt: {
    fontSize: 12,
    color: theme.colors.gray,
  },
  addNewContainer: {
    paddingHorizontal: theme.sizes.padding,
  },
  modal: {
    backgroundColor: theme.colors.white,
    padding: 22,
    borderRadius: theme.sizes.radius,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalBtnContainer: {
    padding: theme.sizes.padding / 2,
  },
});
