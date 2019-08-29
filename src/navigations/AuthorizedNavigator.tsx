import { createStackNavigator, createMaterialTopTabNavigator, TabBarIconProps } from 'react-navigation';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text, View } from 'react-native';
import I18n from '../core/i18n';

import { theme } from '../constants';
import NavigatorMap from './NavigatorMap';
import HomeScreen from '../screens/Home';
import GlobalScoresScreen from '../screens/GlobalScores';
import SummaryScreen from '../screens/Summary';
import LegendScreen from '../screens/Legend';
import EvaluateScreen from '../screens/Evaluate';

import FeelGoodToolsScreen from '../screens/FeelGoodTools';
import DraftsScreen from '../screens/Drafts';

// https://github.com/oblador/react-native-vector-icons#option-with-cocoapods
MaterialCommunityIcons.loadFont();

const HomeStack = createStackNavigator(
  {
    [NavigatorMap.Home]: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    [NavigatorMap.GlobalScores]: {
      screen: GlobalScoresScreen,
      navigationOptions: {
        title: I18n.t('navigation.global_scores'),
      },
    },
    [NavigatorMap.Summary]: {
      screen: SummaryScreen,
      navigationOptions: {
        title: I18n.t('navigation.summary'),
      },
    },
    [NavigatorMap.Legend]: {
      screen: LegendScreen,
      navigationOptions: {
        title: I18n.t('navigation.legend'),
      },
    },
    [NavigatorMap.Evaluate]: {
      screen: EvaluateScreen,
    },
  },
  {
    initialRouteName: NavigatorMap.Home,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.secondary,
      },
      headerBackTitle: null,
    },
  },
);

const FeelGoodToolsStack = createStackNavigator(
  {
    [NavigatorMap.FeelGoodTools]: {
      screen: FeelGoodToolsScreen,
      navigationOptions: {
        title: I18n.t('navigation.feel_good_tools'),
      },
    },
    [NavigatorMap.Drafts]: {
      screen: DraftsScreen,
      navigationOptions: {
        title: I18n.t('navigation.drafts'),
      },
    },
  },
  {
    initialRouteName: NavigatorMap.FeelGoodTools,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.secondary,
      },
      headerBackTitle: null,
    },
  },
);

export default createMaterialTopTabNavigator(
  {
    [NavigatorMap.HomeStack]: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: () => <Text>{I18n.t('navigation.home')}</Text>,
        tabBarIcon: ({ tintColor }: TabBarIconProps) => (
          <MaterialCommunityIcons size={theme.sizes.icon} name="home" color={tintColor || theme.colors.black} />
        ),
      },
    },
    [NavigatorMap.FeelGoodTools]: {
      screen: FeelGoodToolsStack,
      navigationOptions: {
        tabBarLabel: () => <Text>{I18n.t('navigation.feel_good_tools')}</Text>,
        tabBarIcon: ({ tintColor }: TabBarIconProps) => (
          <MaterialCommunityIcons
            size={theme.sizes.icon}
            name="lightbulb-on-outline"
            color={tintColor || theme.colors.black}
          />
        ),
      },
    },
    [NavigatorMap.Profile]: {
      screen: () => <View />,
      navigationOptions: {
        tabBarLabel: () => <Text>{I18n.t('navigation.profile')}</Text>,
        tabBarIcon: ({ tintColor }: TabBarIconProps) => (
          <MaterialCommunityIcons size={theme.sizes.icon} name="account" color={tintColor || theme.colors.black} />
        ),
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      inactiveTintColor: theme.colors.gray,
      activeTintColor: theme.colors.black,
      upperCaseLabel: false,
      style: {
        backgroundColor: theme.colors.white,
      },
      indicatorStyle: {
        backgroundColor: theme.colors.gray,
      },
    },
  },
);
