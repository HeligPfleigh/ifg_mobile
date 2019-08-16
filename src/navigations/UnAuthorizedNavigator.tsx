import {
    createStackNavigator,
} from 'react-navigation';

import NavigatorMap from './NavigatorMap';
import SignInScreen from '../screens/SignIn';

export const AuthStack = createStackNavigator({
    [NavigatorMap.SignIn]: SignInScreen
});
