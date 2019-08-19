import {
    createSwitchNavigator,
} from 'react-navigation';
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { connect } from 'react-redux';

import NavigatorMap from './NavigatorMap';
import { AuthStack } from "./UnAuthorizedNavigator";
import AuthLoadingScreen from "../screens/AuthLoading";
import AppStack from "./AuthorizedNavigator";

const AppNavigator = createSwitchNavigator(
    {
        [NavigatorMap.AuthLoading]: AuthLoadingScreen,
        [NavigatorMap.App]: AppStack,
        [NavigatorMap.Auth]: AuthStack,
    },
    {
        initialRouteName: NavigatorMap.AuthLoading,
    }
);

export const navReducer = createNavigationReducer(AppNavigator);

export const navMiddleware = createReactNavigationReduxMiddleware(
    (state: any) => state.nav,
);

const App = createReduxContainer(AppNavigator);

const mapStateToProps = (state: any) => ({
    state: state.nav,
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
