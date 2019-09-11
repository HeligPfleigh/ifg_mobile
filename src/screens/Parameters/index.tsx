import React from 'react';
import { ScrollView } from 'react-navigation';

import Notifications from './components/Notifications';
import LanguageSetting from './components/LanguageSetting';
import { styles } from './styles';

const Parameters = () => (
  <ScrollView scrollEnabled={false} style={styles.container}>
    <Notifications />
    <LanguageSetting language="fr" />
  </ScrollView>
);

export default Parameters;
