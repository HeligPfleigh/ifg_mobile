import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { EvaluationItem } from '../../components';
import { SunImg, StormImg, MoonImg } from '../../assets/images';
import { theme } from '../../constants';
import I18n from "../../core/i18n";

export default class extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{ padding: theme.sizes.padding }}>
        <EvaluationItem
          colors={['#00FFFF', '#8000FF']}
          header={I18n.t('home.relationships')}
          text={3.6}
          icon={<SunImg />}
        />
        <EvaluationItem
          colors={['#00FFFF', '#8000FF']}
          header={I18n.t('home.activities')}
          text={2.5}
          icon={<StormImg />}
        />
        <EvaluationItem
          colors={['#00FFFF', '#8000FF']}
          header={I18n.t('home.intakes')}
          text={1.8}
          icon={<MoonImg />}
        />
        <EvaluationItem
          colors={['#00FFFF', '#8000FF']}
          text={3.6}
          header={I18n.t('home.other')}
          icon={<SunImg />} />
        <EvaluationItem
          colors={['#00FFFF', '#8000FF']}
          header={I18n.t('home.overall')}
          text={4.5}
          icon={<MoonImg />}
        />
      </ScrollView>
    );
  }
}

