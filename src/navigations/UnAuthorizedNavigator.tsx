import {
    createStackNavigator,
} from 'react-navigation';

import NavigatorMap from './NavigatorMap';
import SignInScreen from '../screens/SignIn';
import WelcomeScreen from '../screens/Welcome';

export const AuthStack = createStackNavigator({
    [NavigatorMap.Welcome]: WelcomeScreen,
    [NavigatorMap.SignIn]: SignInScreen
}, {
    defaultNavigationOptions: {
        header: null
    },
    initialRouteName: NavigatorMap.Welcome
});
