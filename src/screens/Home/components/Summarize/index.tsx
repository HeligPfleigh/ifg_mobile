import React, { Component } from 'react';
import { Text, TouchableOpacity, GestureResponderEvent, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppTourView } from 'react-native-app-tour';

import { theme } from '../../../../constants';
import I18n from '../../../../core/i18n';
import { Block, ScoreText } from '../../../../components';
import { styles } from './styles';
import { WelcomeImg } from '../../../../assets/images';

interface SummarizeProps {
  onPress?: (event: GestureResponderEvent) => void;
  score?: number;
  addAppTourTarget: any;
}

export default class Summarize extends Component<SummarizeProps> {
  render() {
    const { onPress, score, addAppTourTarget } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <WelcomeImg width={60} height={40} />
        <Block flex={3}>
          <Text style={styles.label}>{I18n.t('home.global_scores')}</Text>
        </Block>
        {score !== undefined ? (
          <Block row right flex={1}>
            <ScoreText score={score} style={styles.textScore} />
          </Block>
        ) : (
          <Block />
        )}
        <Block
          collapsable={false}
          flex={1}
          key="summarize"
          right
          row
          ref={ref => {
            if (!ref) return;

            const props = {
              ...theme.defaultApptourTheme,
              order: 11,
              title: I18n.t('apptour.summarize.title'),
              description: I18n.t('apptour.summarize.description'),
            };

            // eslint-disable-next-line no-unused-expressions
            addAppTourTarget && addAppTourTarget(AppTourView.for(ref, { ...props }));
          }}
        >
          <View style={styles.roundContainer}>
            <MaterialCommunityIcons
              name="chevron-right"
              color={theme.colors.white}
              size={theme.sizes.base}
              style={styles.icon}
            />
          </View>
        </Block>
      </TouchableOpacity>
    );
  }
}
