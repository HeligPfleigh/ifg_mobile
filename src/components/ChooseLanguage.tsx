import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeLanguage } from '../store/actions';
import { SupportedLanguage } from '../store/language/types';
import { theme } from '../constants';

export const styles = StyleSheet.create({
  text: {
    color: theme.colors.primary,
    fontSize: theme.sizes.h3,
  },
  separate: {
    fontSize: theme.sizes.h3,
  },
});

const ChooseLanguage: React.FC = () => {
  const dispatch = useDispatch();
  const handleChange = (value: SupportedLanguage) => {
    dispatch(changeLanguage({ locale: value }));
  };

  return (
    <React.Fragment>
      <TouchableOpacity
        onPress={() => {
          handleChange(SupportedLanguage.en);
        }}
      >
        <Text style={styles.text}>English</Text>
      </TouchableOpacity>
      <Text style={styles.separate}> / </Text>
      <TouchableOpacity
        onPress={() => {
          handleChange(SupportedLanguage.fr);
        }}
      >
        <Text style={styles.text}>Français</Text>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default ChooseLanguage;
