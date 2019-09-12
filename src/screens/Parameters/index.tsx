import React from 'react';
import { ScrollView } from 'react-navigation';

import I18n from '../../core/i18n';
import Notifications from './components/Notifications';
import LanguageSetting from './components/LanguageSetting';
import { styles } from './styles';

const Parameters = () => (
  <ScrollView scrollEnabled={false} style={styles.container}>
    <Notifications />
    <LanguageSetting language={I18n.locale} />
  </ScrollView>
);

export default Parameters;
