import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeLanguage } from '../store/actions';
import { SupportedLanguage } from '../store/language/types';
import { theme } from '../constants';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.gray5,
    fontSize: 15,
  },
});

const ChooseLanguage: React.FC = () => {
  const dispatch = useDispatch();
  const handleChange = (value: SupportedLanguage) => {
    dispatch(changeLanguage({ locale: value }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          handleChange(SupportedLanguage.en);
        }}
      >
        <Text style={styles.text}>English </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleChange(SupportedLanguage.fr);
        }}
      >
        <Text style={styles.text}> Français</Text>
      </TouchableOpacity>
    </>
  );
};

export default ChooseLanguage;
