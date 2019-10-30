import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { get } from 'lodash';
import { WithTranslations } from '.';
import { theme } from '../constants';
import { Youtube } from '../assets/images';

const styles = StyleSheet.create({
  wrap: { marginRight: theme.sizes.padding },
});

interface Props {}

const YoutubeLink: React.FC<Props> = (props: Props) => {
  const lang = get(props, 'lang');

  const _handleClick = () => {
    Linking.openURL(
      lang === 'en' ? 'https://www.youtube.com/watch?v=rZElREF68rU' : 'https://www.youtube.com/watch?v=OyJkTu4AJRA',
    );
  };

  return (
    <TouchableOpacity onPress={_handleClick} style={styles.wrap}>
      <Image source={Youtube} />
    </TouchableOpacity>
  );
};

export default WithTranslations(YoutubeLink);
