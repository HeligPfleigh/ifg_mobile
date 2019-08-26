import React, { Component } from 'react';
import { Text } from 'react-native';

import { WelcomeImg } from '../../assets/images';
import { Block, Button } from '../../components';
import { theme } from '../../constants';
import { styles } from './styles';
import I18n from '../../core/i18n';

export default class extends Component {
  render() {
    return (
      <Block>
        <Block center bottom flex={1}>
          <WelcomeImg />
        </Block>
        <Block center middle flex={0.5}>
          <Text style={styles.header}>{I18n.t('welcome.header')}</Text>
          <Text style={styles.paragraph}>{I18n.t('welcome.paragraph')}</Text>
        </Block>
        <Block middle flex={0.5} margin={[0, theme.sizes.padding * 2]}>
          <Button gradient>
            <Block center middle>
              <Text style={styles.textBtn}>{I18n.t('welcome.signup')}</Text>
            </Block>
          </Button>
          <Button shadow>
            <Block center middle>
              <Text style={styles.textBtn}>{I18n.t('welcome.signin')}</Text>
            </Block>
          </Button>
        </Block>
        <Block flex={1} />
      </Block>
    );
  }
}
