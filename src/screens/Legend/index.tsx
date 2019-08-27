import React, { Component } from 'react';
import { Text } from 'react-native';

import { Block, ScoreText } from '../../components';
import { theme } from '../../constants';
import I18n from '../../core/i18n';
import { styles } from './styles';
import { FeelGoodLv4, FeelGoodLv2, FeelGoodLv0 } from '../../assets/images';

const scores = [...Array(11)].map((_, index) => index - 5).reverse();

export default class Legend extends Component {
  render() {
    return (
      <Block padding={theme.sizes.padding}>
        <Block style={styles.container}>
          <Block center middle padding={theme.sizes.base} flex={1}>
            <Text style={styles.headerTitle}>{I18n.t('legend.header.title')}</Text>
            <Text>{I18n.t('legend.header.body')}</Text>
          </Block>
          <Block flex={3} padding={theme.sizes.base} row>
            <Block flex={1} style={styles.leftContainer}>
              {scores.map(item => (
                <Block flex={1} center middle key={`${item}`}>
                  <ScoreText score={item} />
                </Block>
              ))}
            </Block>
            <Block flex={8}>
              <Block flex={1} row>
                <Block flex={2} center middle>
                  <FeelGoodLv4 width={100} height={100} />
                </Block>
                <Block flex={3} middle>
                  <Text style={{ color: theme.scoreSpectrum[10] }}>{I18n.t('legend.subtitle.good')}</Text>
                </Block>
              </Block>
              <Block flex={1} row style={styles.rightMiddleContainer}>
                <Block flex={2} center middle>
                  <FeelGoodLv2 width={100} height={100} />
                </Block>
                <Block flex={3} middle>
                  <Text style={{ color: theme.colors.yellow }}>{I18n.t('legend.subtitle.normal')}</Text>
                </Block>
              </Block>
              <Block flex={1} row>
                <Block flex={2} center middle>
                  <FeelGoodLv0 width={100} height={100} />
                </Block>
                <Block flex={3} middle>
                  <Text style={{ color: theme.scoreSpectrum[0] }}>{I18n.t('legend.subtitle.bad')}</Text>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}
