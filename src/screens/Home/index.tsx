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

  _navigateToSummaryScreen = (evaluationType: theme.EvaluationType) => this.props.navigation.navigate(NavigatorMap.Summary, { evaluationType })

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
          <Summarize score={4.5} onPress={this._navigateToGlobalScoresScreen} />
        </View>
        <Block flex={2}>
          <ScrollView contentContainerStyle={{ padding: theme.sizes.padding }}>
            <EvaluationItem
              colors={theme.gradients.pink}
              header={I18n.t('home.relationships')}
              text={I18n.t('home.view_details')}
              headerColor={theme.colors.pink}
              icon={<SunImg />}
              onPressText={() => this._navigateToSummaryScreen(theme.EvaluationType.RELATIONSHIPS)}
            />
            <EvaluationItem
              colors={theme.gradients.blue}
              header={I18n.t('home.activities')}
              text={I18n.t('home.view_details')}
              headerColor={theme.colors.blue}
              icon={<StormImg />}
              onPressText={() => this._navigateToSummaryScreen(theme.EvaluationType.ACTIVITIES)}
            />
            <EvaluationItem
              colors={theme.gradients.orange}
              header={I18n.t('home.intakes')}
              text={I18n.t('home.view_details')}
              headerColor={theme.colors.orange}
              icon={<MoonImg />}
              onPressText={() => this._navigateToSummaryScreen(theme.EvaluationType.INTAKES)}
            />
            <EvaluationItem
              colors={theme.gradients.purple}
              text={I18n.t('home.view_details')}
              header={I18n.t('home.other')}
              headerColor={theme.colors.purple}
              icon={<SunImg />}
              onPressText={() => this._navigateToSummaryScreen(theme.EvaluationType.OTHER)}
            />
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

export default Home;
