import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer
} from 'react-navigation';

import NavigatorMap from './NavigatorMap';
import { AuthStack } from "./UnAuthorizedNavigator";
import AuthLoadingScreen from "../screens/AuthLoading";
import HomeScreen from '../screens/Home';

const AppStack = createStackNavigator({
    [NavigatorMap.Home]: HomeScreen
});

export default createAppContainer(createSwitchNavigator(
    {
        [NavigatorMap.AuthLoading]: AuthLoadingScreen,
        [NavigatorMap.App]: AppStack,
        [NavigatorMap.Auth]: AuthStack,
    },
    {
        initialRouteName: NavigatorMap.AuthLoading,
    }
));
