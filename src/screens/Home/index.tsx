import React, { Component } from 'react';
import { Text, ScrollView, Image, View } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import get from 'lodash/get';

import noop from 'lodash/noop';
import { Block, EvaluationItem } from '../../components';
import { theme, Enum } from '../../constants';
import I18n from '../../core/i18n';
import { showWeatherIcon } from '../../core/utils';
import { DefaultAvatar } from '../../assets/images';
import Summarize from './components/Summarize';
import { styles } from './styles';
import NavigatorMap from '../../navigations/NavigatorMap';
import { AppState, MeState } from '../../store/types';
import { me, showModal } from '../../store/actions';

interface HomeProps {
  dispatch: Dispatch<any>;
  navigation: NavigationScreenProp<NavigationState>;
  me: MeState;
}

class Home extends Component<HomeProps> {
  componentDidMount() {
    this.props.dispatch(me());
  }

  _navigateToGlobalScoresScreen = () => {
    const {
      me: {
        data: { score },
      },
      navigation,
      dispatch,
    } = this.props;
    const overallScore = get(score, Enum.EvaluationType.OVERALL);
    if (overallScore === undefined) {
      dispatch(showModal({ onModalPress: noop, modalType: Enum.ModalType.SELF_EVALUATION }));
    } else {
      navigation.navigate(NavigatorMap.GlobalScores);
    }
  };

  _navigateToEvaluateScreen = (evaluationType: Enum.EvaluationType) => {
    this.props.navigation.navigate(NavigatorMap.Evaluate, {
      [Enum.NavigationParamsName.EVALUATION_TYPE]: evaluationType,
    });
  };

  render() {
    const {
      me: {
        data: { username, score, avatar },
      },
    } = this.props;
    return (
      <Block>
        <View style={styles.headerContainer}>
          <Image source={avatar || DefaultAvatar} style={styles.avatar} />
          <Block flex={0.5} middle center>
            <Text>{username}</Text>
          </Block>
          <Summarize score={get(score, Enum.EvaluationType.OVERALL)} onPress={this._navigateToGlobalScoresScreen} />
        </View>
        <Block flex={2}>
          <ScrollView contentContainerStyle={{ padding: theme.sizes.padding }}>
            <EvaluationItem
              colors={theme.gradients.pink}
              header={I18n.t('home.relationships')}
              headerColor={theme.colors.pink}
              icon={showWeatherIcon(get(score, Enum.EvaluationType.RELATIONSHIPS))}
              onPress={() => this._navigateToEvaluateScreen(Enum.EvaluationType.RELATIONSHIPS)}
              detailComponent={<Text style={styles.detail}>{I18n.t('home.description.relationships')}</Text>}
            />
            <EvaluationItem
              colors={theme.gradients.blue}
              header={I18n.t('home.activities')}
              headerColor={theme.colors.blue}
              icon={showWeatherIcon(get(score, Enum.EvaluationType.ACTIVITIES))}
              onPress={() => this._navigateToEvaluateScreen(Enum.EvaluationType.ACTIVITIES)}
              detailComponent={<Text style={styles.detail}>{I18n.t('home.description.activities')}</Text>}
            />
            <EvaluationItem
              colors={theme.gradients.orange}
              header={I18n.t('home.intakes')}
              headerColor={theme.colors.orange}
              icon={showWeatherIcon(get(score, Enum.EvaluationType.INTAKES))}
              onPress={() => this._navigateToEvaluateScreen(Enum.EvaluationType.INTAKES)}
              detailComponent={<Text style={styles.detail}>{I18n.t('home.description.intakes')}</Text>}
            />
            <EvaluationItem
              colors={theme.gradients.purple}
              header={I18n.t('home.other')}
              headerColor={theme.colors.purple}
              icon={showWeatherIcon(get(score, Enum.EvaluationType.OTHER))}
              onPress={() => this._navigateToEvaluateScreen(Enum.EvaluationType.OTHER)}
              detailComponent={<Text style={styles.detail}>{I18n.t('home.description.other')}</Text>}
            />
          </ScrollView>
        </Block>
      </Block>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  me: state.me,
});

export default connect(mapStateToProps)(Home);
