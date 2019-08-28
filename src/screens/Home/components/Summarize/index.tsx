import React, { Component } from 'react';
import { Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../../../constants';
import I18n from '../../../../core/i18n';
import { Block, ScoreText } from '../../../../components';
import { styles } from './styles';
import { WelcomeImg } from '../../../../assets/images';

interface SummarizeProps {
  onPress?: (event: GestureResponderEvent) => void;
  score?: number;
}

export default class Summarize extends Component<SummarizeProps> {
  render() {
    const { onPress, score } = this.props;
    return (
      <Block row style={styles.container}>
        <Block flex={1}>
          <WelcomeImg width={60} height={40} />
        </Block>
        <Block flex={2}>
          <Text style={styles.label}>{I18n.t('home.global_scores')}</Text>
        </Block>
        {score !== undefined ? (
          <Block row right flex={2}>
            <ScoreText score={score} />
          </Block>
        ) : (
          <Block />
        )}
        <Block flex={1} right row>
          <TouchableOpacity style={styles.roundContainer} onPress={onPress}>
            <MaterialCommunityIcons
              name="chevron-right"
              color={theme.colors.white}
              size={theme.sizes.base}
              style={styles.icon}
            />
          </TouchableOpacity>
        </Block>
      </Block>
    );
  }
}
