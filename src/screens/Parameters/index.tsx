import React from 'react';
import { ScrollView } from 'react-navigation';
import LanguageSetting from './components/LanguageSetting';
import { styles } from './styles';

const Parameters = () => (
  <ScrollView scrollEnabled={false} style={styles.container}>
    <LanguageSetting />
  </ScrollView>
);

export default Parameters;
