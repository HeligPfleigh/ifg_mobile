import React from 'react';
import { Text } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { WelcomeImg } from '../../assets/images';
import { Block, Button } from '../../components';
import { theme } from '../../constants';
import { styles } from './styles';
import I18n from '../../core/i18n';
import NavigatorMap from '../../navigations/NavigatorMap';

interface WelcomeProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const Welcome: React.FC<WelcomeProps> = (props: WelcomeProps) => {
  const _navigateToSignUpScreen = () => {
    props.navigation.navigate(NavigatorMap.SignUp);
  };

  const _navigateToSignInScreen = () => {
    props.navigation.navigate(NavigatorMap.SignIn);
  };

  return (
    <Block>
      <Block center bottom flex={1}>
        <WelcomeImg />
      </Block>
      <Block center middle flex={0.5}>
        <Text style={styles.header}>{I18n.t('welcome.header')}</Text>
        <Text style={styles.paragraph}>{I18n.t('welcome.paragraph')}</Text>
      </Block>
      <Block middle flex={0.5} margin={[0, theme.sizes.padding]}>
        <Block middle>
          <Button gradient onPress={_navigateToSignUpScreen}>
            <Block center middle>
              <Text style={styles.textSignUpBtn}>{I18n.t('welcome.signup')}</Text>
            </Block>
          </Button>
        </Block>
        <Block middle>
          <Button gradient style={styles.button} onPress={_navigateToSignInScreen}>
            <Block center middle style={styles.buttonBody}>
              <Text style={styles.textSignInBtn}>{I18n.t('welcome.signin')}</Text>
            </Block>
          </Button>
        </Block>
      </Block>
      <Block flex={1} />
    </Block>
  );
};

export default Welcome;
