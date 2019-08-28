import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator, TabBarIconProps } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
import ProfileScreen from '../screens/Profile';
import AccountSettings from '../screens/AccountSettings';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: theme.colors.secondary,
  },
  headerBackTitle: null,
  headerTintColor: theme.colors.black,
  headerTitleStyle: { fontSize: theme.sizes.title },
};

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
    defaultNavigationOptions,
    initialRouteName: NavigatorMap.Home,
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
    defaultNavigationOptions,
    initialRouteName: NavigatorMap.FeelGoodTools,
  },
);

const ProfileStack = createStackNavigator(
  {
    [NavigatorMap.Profile]: {
      screen: ProfileScreen,
    },
    [NavigatorMap.AccountSettings]: {
      screen: AccountSettings,
      navigationOptions: {
        title: I18n.t('navigation.account_settings'),
      },
    },
  },
  {
    defaultNavigationOptions,
    initialRouteName: NavigatorMap.Profile,
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
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: () => <Text>{I18n.t('navigation.profile')}</Text>,
        tabBarIcon: ({ tintColor }: TabBarIconProps) => (
          <MaterialCommunityIcons size={theme.sizes.icon} name="account" color={tintColor || theme.colors.black} />
        ),
      },
    },
  },
  {
    initialRouteName: NavigatorMap.Profile,
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
