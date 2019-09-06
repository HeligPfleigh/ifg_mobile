import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export const styles = StyleSheet.create({
  footerContainer: {
    paddingVertical: theme.sizes.margin,
    paddingHorizontal: theme.sizes.padding,
  },
  nextBtn: {
    marginBottom: theme.sizes.margin / 2,
  },
  nextBtnTxt: {
    color: theme.colors.white,
  },
  draftBtn: {
    borderColor: theme.colors.orange,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export const step1Styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding / 2,
  },
  header: {
    textAlign: 'center',
    fontSize: theme.sizes.h2,
  },
  name: {
    fontSize: theme.sizes.font,
    marginBottom: theme.sizes.margin / 2,
    color: theme.colors.gray,
  },
  input: {
    height: 40,
    borderColor: theme.colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    width: '100%',
    paddingHorizontal: theme.sizes.margin / 2,
  },
  chip: {
    marginRight: theme.sizes.margin / 2,
    marginVertical: theme.sizes.margin,
    borderRadius: theme.sizes.base,
    paddingHorizontal: theme.sizes.padding / 2,
    borderColor: theme.colors.gray,
    borderWidth: 1,
    paddingVertical: theme.sizes.margin / 2,
  },
  selectedChip: {
    backgroundColor: theme.colors.purple1,
  },
  selectedChipTxt: {
    color: theme.colors.white,
  },
});

export const step2Styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.margin,
  },
  frame: {
    borderColor: theme.colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
  },
  leftFrame: {
    padding: theme.sizes.padding / 2,
  },
  rightFrame: {
    backgroundColor: theme.colors.indigo,
  },
  name: {
    color: theme.colors.white,
  },
  header: {
    textAlign: 'center',
    fontSize: theme.sizes.h2,
  },
  cardHeader: {
    textAlign: 'center',
    fontSize: theme.sizes.font,
  },
  card: {
    width: 150,
    height: 120,
    borderColor: theme.colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.sizes.base,
    margin: theme.sizes.margin,
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
  selected: {
    backgroundColor: theme.colors.gray3,
  },
});

export const step3Styles = StyleSheet.create({
  container: {
    padding: theme.sizes.padding,
  },
  frame: {
    borderColor: theme.colors.gray,
    borderWidth: StyleSheet.hairlineWidth,
  },
  leftFrame: {
    padding: theme.sizes.padding / 2,
  },
  rightFrame: {
    padding: theme.sizes.padding / 2,
  },
  name: {
    color: theme.colors.purple,
  },
  header: {
    fontSize: theme.sizes.h2,
  },
  score: {
    fontSize: theme.sizes.h2,
    color: theme.colors.white,
  },
  score_label: {
    fontSize: theme.sizes.font,
    color: theme.colors.white,
  },
  spectrum: {
    maxHeight: 50,
    marginHorizontal: theme.sizes.padding * 4,
    marginVertical: theme.sizes.margin / 2,
  },
});
