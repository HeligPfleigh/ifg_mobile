import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

import { Block, EvaluationItem } from '../../components';
import { theme } from '../../constants';
import I18n from '../../core/i18n';
import { SunImg, MoonImg, StormImg, DefaultAvatar } from '../../assets/images';
import Summarize from './components/Summarize';
import { styles } from "./styles";
import NavigatorMap from '../../navigations/NavigatorMap';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

const username = "Test User";

interface HomeProps {
  navigation: NavigationScreenProp<NavigationState>;
}

class Home extends Component<HomeProps> {
  _navigateToGlobalScoresScreen = () => this.props.navigation.navigate(NavigatorMap.GlobalScores);

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
          <Summarize score={4.5} onPress={this._navigateToGlobalScoresScreen}/>
        </View>
        <Block flex={2}>
          <ScrollView contentContainerStyle={{ padding: theme.sizes.padding }}>
            <EvaluationItem
              colors={['#00FFFF', '#8000FF']}
              header={I18n.t('home.relationships')}
              text={I18n.t('home.view_details')}
              icon={<SunImg />}
            />
            <EvaluationItem
              colors={['#00FFFF', '#8000FF']}
              header={I18n.t('home.activities')}
              text={I18n.t('home.view_details')}
              icon={<StormImg />}
            />
            <EvaluationItem
              colors={['#00FFFF', '#8000FF']}
              header={I18n.t('home.intakes')}
              text={I18n.t('home.view_details')}
              icon={<MoonImg />}
            />
            <EvaluationItem
              colors={['#00FFFF', '#8000FF']}
              text={I18n.t('home.view_details')}
              header={I18n.t('home.other')}
              icon={<SunImg />} />
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

export default Home;
