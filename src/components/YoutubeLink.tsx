import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import WithTranslations from './WithTranslations';
import { theme } from '../constants';
import { Youtube } from '../assets/images';

const styles = StyleSheet.create({
  wrap: { marginRight: theme.sizes.padding },
});

const YoutubeLink: React.FC = () => {
  const _handleClick = () => {
    Linking.openURL('https://www.youtube.com/channel/UC-88VR_kxuuIMtbyo5yPB1A?view_as=subscriber');
  };

  return (
    <TouchableOpacity onPress={_handleClick} style={styles.wrap}>
      <Image source={Youtube} />
    </TouchableOpacity>
  );
};

export default WithTranslations(YoutubeLink);
