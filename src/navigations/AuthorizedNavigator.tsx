import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    TabBarIconProps
} from 'react-navigation';
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { theme } from "../constants";
import NavigatorMap from './NavigatorMap';
import HomeScreen from '../screens/Home';

// https://github.com/oblador/react-native-vector-icons#option-with-cocoapods
MaterialCommunityIcons.loadFont();

export default createMaterialTopTabNavigator({
    [NavigatorMap.Home]: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }: TabBarIconProps) => <MaterialCommunityIcons size={theme.sizes.icon} name="home" color={tintColor || theme.colors.black} />
        }
    },
    [NavigatorMap.FeelGoodTools]: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }: TabBarIconProps) => <MaterialCommunityIcons size={theme.sizes.icon} name="lightbulb-on-outline" color={tintColor || theme.colors.black} />
        }
    },
    [NavigatorMap.Profile]: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarIcon: ({ tintColor }: TabBarIconProps) => <MaterialCommunityIcons size={theme.sizes.icon} name="account" color={tintColor || theme.colors.black} />
        }
    },
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        showIcon: true,
        inactiveTintColor: theme.colors.gray,
        activeTintColor: theme.colors.black,
        upperCaseLabel: false,
        style: {
            backgroundColor: theme.colors.white
        },
        indicatorStyle: {
            backgroundColor: theme.colors.gray
        }
    }
});