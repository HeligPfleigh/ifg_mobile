import { createStackNavigator, createMaterialTopTabNavigator, TabBarIconProps, StackActions } from 'react-navigation';
import React from 'react';
import { Text, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import I18n from '../core/i18n';
import { theme } from '../constants';
import { I18nTitle } from '../components';
import NavigatorMap from './NavigatorMap';
import HomeScreen from '../screens/Home';
import GlobalScoresScreen from '../screens/GlobalScores';
import SummaryScreen from '../screens/Summary';
import LegendScreen from '../screens/Legend';
import EvaluateScreen from '../screens/Evaluate';
import FeelGoodToolsScreen from '../screens/FeelGoodTools';
import DraftsScreen from '../screens/Drafts';
import ProfileScreen from '../screens/Profile';
import UserInfo from '../screens/UserInfo';
import AccountSettings from '../screens/AccountSettings';
import ActionListScreen from '../screens/ActionList';
import AchievedActionsScreen from '../screens/AchievedActions';
import ContactUS from '../screens/ContactUS';
import Parameters from '../screens/Parameters';
import DeleteAccount from '../screens/DeleteAccount';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: theme.colors.secondary,
  },
  headerBackTitle: null,
  headerTintColor: theme.colors.black,
  headerTitleStyle: { fontSize: theme.sizes.h3 },
  headerLeftContainerStyle: {
    marginLeft: Platform.OS === 'ios' ? theme.sizes.margin : 0,
  },
};

const HomeStack = createStackNavigator(
  {
    [NavigatorMap.Home]: {
      screen: HomeScreen, // Main screen
      navigationOptions: {
        header: null,
      },
    },
    [NavigatorMap.GlobalScores]: {
      screen: GlobalScoresScreen,
      navigationOptions: {
        headerTitle: <I18nTitle text="navigation.global_scores" />,
      },
    },
    [NavigatorMap.Summary]: {
      screen: SummaryScreen,
      navigationOptions: {
        headerTitle: <I18nTitle text="navigation.summary" />,
      },
    },
    [NavigatorMap.Legend]: {
      screen: LegendScreen,
      navigationOptions: {
        headerTitle: <I18nTitle text="navigation.legend" />,
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
        headerTitle: (
          <I18nTitle
            text="navigation.feel_good_tools"
            style={{ marginLeft: Platform.OS === 'android' ? theme.sizes.padding : 0 }}
          />
        ),
      },
    },
    [NavigatorMap.Drafts]: {
      screen: DraftsScreen,
      navigationOptions: {
        headerTitle: <I18nTitle text="navigation.drafts" />,
      },
    },
    [NavigatorMap.ActionList]: {
      screen: ActionListScreen,
      navigationOptions: {
        headerTitle: <I18nTitle text="navigation.action_list" />,
      },
    },
    [NavigatorMap.AchievedActions]: {
      screen: AchievedActionsScreen,
      navigationOptions: {
        headerTitle: <I18nTitle text="navigation.action_list" />,
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
      screen: ProfileScreen, // Main screen
      navigationOptions: {
        header: null,
      },
    },
    [NavigatorMap.UserInfo]: {
      screen: UserInfo,
      navigationOptions: {
        headerTitle: <I18nTitle text="navigation.user_info" />,
      },
    },
    [NavigatorMap.ContactUS]: {
      screen: ContactUS,
      navigationOptions: {
        headerTitle: <I18nTitle text="navigation.contact_us" />,
      },
    },
    [NavigatorMap.AccountSettings]: {
      screen: AccountSettings,
      navigationOptions: {
        headerTitle: <I18nTitle text="navigation.account_settings" />,
      },
    },
    [NavigatorMap.Parameters]: {
      screen: Parameters,
      navigationOptions: {
        headerTitle: <I18nTitle text="navigation.parameters" />,
      },
    },
    [NavigatorMap.DeleteAccount]: {
      screen: DeleteAccount,
      navigationOptions: {
        headerTitle: <I18nTitle text="navigation.delete_account" />,
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
    swipeEnabled: false,
    defaultNavigationOptions: {
      tabBarOnPress: ({ navigation }: any) => {
        navigation.dispatch(StackActions.popToTop());
        navigation.navigate(navigation.state.routeName);
      },
    },
  },
);
