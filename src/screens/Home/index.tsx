import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { Block } from '../../components';
import { theme } from '../../constants';
import I18n from '../../core/i18n';
import { SunImg, MoonImg, StormImg, DefaultAvatar } from '../../assets/images';
import EvaluationItem from './components/EvaluationItem';
import Summarize from './components/Summarize';
import { styles } from "./styles";

const username = "Test User";

class Home extends Component {
  render() {
    return (
      <Block>
        <View style={styles.headerContainer}>
          <Image
            source={DefaultAvatar}
            style={styles.avatar}
          />
          <Block flex={0.5} middle center>
            <Text>{username}</Text>
          </Block>
          <Summarize score={4.5} />
        </View>
        <Block flex={2}>
          <ScrollView contentContainerStyle={{ padding: theme.sizes.padding }}>
            <EvaluationItem colors={['#00FFFF', '#8000FF']} header={I18n.t('home.relationships')} icon={<SunImg />} />
            <EvaluationItem colors={['#00FFFF', '#8000FF']} header={I18n.t('home.activities')} icon={<SunImg />} />
            <EvaluationItem colors={['#00FFFF', '#8000FF']} header={I18n.t('home.intakes')} icon={<MoonImg />} />
            <EvaluationItem colors={['#00FFFF', '#8000FF']} header={I18n.t('home.other')} icon={<SunImg />} />
            <EvaluationItem colors={['#00FFFF', '#8000FF']} header={I18n.t('home.overall')} icon={<StormImg />} />
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

export default Home;
