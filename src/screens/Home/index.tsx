import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import get from 'lodash/get';
import noop from 'lodash/noop';
import isEmpty from 'lodash/isEmpty';
import SplashScreen from 'react-native-splash-screen';
import { Text, ScrollView, Image, DeviceEventEmitter } from 'react-native';
import { NavigationEvents, SafeAreaView } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { AppTour, AppTourSequence, AppTourView } from 'react-native-app-tour';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Block, EvaluationItem, Loader, WithTranslations } from '../../components';
import { theme, Enum } from '../../constants';
import I18n from '../../core/i18n';
import { showWeatherIcon } from '../../core/utils';
import { DefaultAvatar } from '../../assets/images';
import Summarize from './components/Summarize';
import { styles } from './styles';
import NavigatorMap from '../../navigations/NavigatorMap';
import { AppState, MeState, TourState } from '../../store/types';
import { me, showModal, finishHomeTour } from '../../store/actions';

interface HomeProps extends NavigationStackScreenProps {
  dispatch: Dispatch<any>;
  me: MeState;
  tour: TourState;
}

class Home extends Component<HomeProps> {
  appTourTimeout: NodeJS.Timeout | undefined;

  appTourTargets: any;

  sequenceStepListener: any;

  finishSequenceListener: any;

  constructor(props: HomeProps) {
    super(props);
    this.appTourTargets = [];
    this.registerSequenceStepEvent();
    this.registerFinishSequenceEvent();
  }

  componentDidMount() {
    const { tour } = this.props;
    this._loadData();
    SplashScreen.hide();
    if (!tour.isHomeFinished) {
      this.appTourTimeout = setTimeout(() => {
        const appTourSequence = new AppTourSequence();
        this.appTourTargets.forEach((appTourTarget: any) => {
          appTourSequence.add(appTourTarget);
        });

        AppTour.ShowSequence(appTourSequence);
      }, 1000);
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-unused-expressions
    this.sequenceStepListener && this.sequenceStepListener.remove();
    // eslint-disable-next-line no-unused-expressions
    this.finishSequenceListener && this.finishSequenceListener.remove();
    // eslint-disable-next-line no-unused-expressions
    this.appTourTimeout && clearTimeout(this.appTourTimeout);
  }

  registerSequenceStepEvent = () => {
    if (this.sequenceStepListener) {
      this.sequenceStepListener.remove();
    }
    this.sequenceStepListener = DeviceEventEmitter.addListener('onShowSequenceStepEvent', noop);
  };

  registerFinishSequenceEvent = () => {
    const { dispatch } = this.props;
    if (this.finishSequenceListener) {
      this.finishSequenceListener.remove();
    }
    this.finishSequenceListener = DeviceEventEmitter.addListener('onFinishSequenceEvent', () => {
      dispatch(finishHomeTour());
    });
  };

  _loadData = () => this.props.dispatch(me());

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
    const isFetching = get(this.props, 'me.isFetching', true);
    const avatar = get(this.props, 'me.data.user.avatar', undefined);
    const name = get(this.props, 'me.data.user.username', '');
    const score = get(this.props, 'me.data.score');
    return (
      <Block style={styles.container}>
        <Loader loading={isFetching} />
        <NavigationEvents onDidFocus={this._loadData} />
        <SafeAreaView style={styles.headerContainer}>
          <Block flex={1} middle center>
            <Image source={!isEmpty(avatar) ? { uri: avatar } : DefaultAvatar} style={styles.avatar} />
          </Block>
          <Block flex={0.5} middle center>
            <Text style={styles.name}>{name}</Text>
          </Block>
          <Block flex={0.7} middle center>
            <Summarize
              score={get(score, Enum.EvaluationType.OVERALL)}
              onPress={this._navigateToGlobalScoresScreen}
              addAppTourTarget={(appTourTarget: any) => {
                this.appTourTargets.push(appTourTarget);
              }}
            />
          </Block>
        </SafeAreaView>
        <Block flex={2} style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: theme.sizes.padding }}>
            <EvaluationItem
              key="evaluation-item"
              ref={ref => {
                if (!ref) return;

                const props = {
                  ...theme.defaultApptourTheme,
                  order: 1,
                  targetRadius: 0,
                  cancelable: true,
                  title: I18n.t('apptour.evaluationItem.title'),
                  description: I18n.t('apptour.evaluationItem.description'),
                };

                this.appTourTargets.push(AppTourView.for(ref, { ...props }));
              }}
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
        {!this.props.tour.isHomeFinished && (
          <Block
            flex={false}
            style={styles.tour}
            key="feel-good-tools"
            ref={ref => {
              if (!ref) return;

              const props = {
                ...theme.defaultApptourTheme,
                order: 3,
                targetRadius: 80,
                cancelable: true,
                title: I18n.t('apptour.feelGoodTools.title'),
                description: I18n.t('apptour.feelGoodTools.description'),
              };

              this.appTourTargets.push(AppTourView.for(ref, { ...props }));
            }}
            collapsable={false}
          >
            <MaterialCommunityIcons size={theme.sizes.icon} name="lightbulb-on-outline" color={theme.colors.black} />
            <Text style={{ fontSize: 12 }}>{I18n.t('navigation.feel_good_tools')}</Text>
          </Block>
        )}
      </Block>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  me: state.me,
  tour: state.tour,
});

export default WithTranslations(connect(mapStateToProps)(Home));
