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

// https://github.com/oblador/react-native-vector-icons#option-with-cocoapods
MaterialCommunityIcons.loadFont();

const HomeStack = createStackNavigator(
  {
    [NavigatorMap.Home]: {
      screen: HomeScreen,
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
  },
  {
    initialRouteName: NavigatorMap.Home,
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme.colors.secondary,
      },
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
      screen: () => <View />,
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
