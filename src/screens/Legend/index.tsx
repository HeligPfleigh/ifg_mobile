import React from 'react';
import { Text } from 'react-native';

import { Block, ScoreText } from '../../components';
import { theme } from '../../constants';
import I18n from '../../core/i18n';
import { styles } from './styles';
import { SunImg, MoonImg, StormImg } from '../../assets/images';

const scores = [...Array(11)]
  .map((_, index) => index - 5)
  .filter(idx => idx !== 0)
  .reverse();

const Legend: React.FC = () => {
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
                <SunImg width={100} height={100} />
              </Block>
              <Block flex={3} middle>
                <Text style={{ color: theme.scoreSpectrum[10] }}>{I18n.t('legend.subtitle.good')}</Text>
              </Block>
            </Block>
            <Block flex={1} row style={styles.rightMiddleContainer}>
              <Block flex={2} center middle>
                <MoonImg width={80} height={80} />
              </Block>
              <Block flex={3} middle>
                <Text style={{ color: theme.colors.yellow }}>{I18n.t('legend.subtitle.normal')}</Text>
              </Block>
            </Block>
            <Block flex={1} row>
              <Block flex={2} center middle>
                <StormImg width={100} height={100} />
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
};

export default Legend;
