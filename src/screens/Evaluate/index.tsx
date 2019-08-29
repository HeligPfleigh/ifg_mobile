import React, { Component } from 'react';
import { Text } from 'react-native';
import { NavigationScreenProp, NavigationState, HeaderBackButton } from 'react-navigation';
import noop from 'lodash/noop';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Block, Button } from '../../components';
import I18n from '../../core/i18n';
import { styles } from './styles';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Enum } from '../../constants';
import { showModal, saveDraft } from '../../store/actions';

interface EvaluateProps {
  navigation: NavigationScreenProp<NavigationState>;
  dispatch: Dispatch<any>;
}

interface EvaluateState {
  id: number;
  type: Enum.EvaluationType | null;
  step: number;
  name: string;
  label: Enum.Tags | null;
  desc: string;
  feeling: Enum.Feeling | null;
  impactType: Enum.ImpactType | null;
  score: number;
}

class Evaluate extends Component<EvaluateProps, EvaluateState> {
  static navigationOptions = ({ navigation }: any) => {
    const evaluationType = navigation.getParam(Enum.NavigationParamsName.EVALUATION_TYPE);
    const title = evaluationType ? I18n.t(`summary.${evaluationType}`) : I18n.t('navigation.evaluate');
    return {
      title,
      headerLeft: () => <HeaderBackButton onPress={navigation.getParam('handleBack', noop)} />,
    };
  };

  constructor(props: EvaluateProps) {
    super(props);
    this.state = {
      id: new Date().valueOf(),
      type: Enum.EvaluationType.RELATIONSHIPS,
      label: null,
      step: 1,
      name: '',
      desc: '',
      feeling: null,
      impactType: null,
      score: 0,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const type = navigation.getParam(Enum.NavigationParamsName.EVALUATION_TYPE, null);
    const draftData = navigation.getParam(Enum.NavigationParamsName.EVALUATION_DATA, null);
    navigation.setParams({ handleBack: this._handleBack });
    if (!draftData) {
      // eslint-disable-next-line react/no-unused-state
      this.setState({ type });
    } else {
      const { score, impactType } = draftData;

      if (!impactType) {
        draftData.step = 1;
      } else if (impactType && !score) {
        draftData.step = 2;
      } else if (score > 0) {
        draftData.feeling = Enum.Feeling.GOOD;
        draftData.step = 3;
      } else {
        draftData.feeling = Enum.Feeling.BAD;
        draftData.step = 3;
      }

      this.setState({ ...draftData });
    }
  }

  _handleBack = () => {
    const { step } = this.state;
    const { navigation } = this.props;
    if (step > 1) {
      this.setState({ step: step - 1 });
    } else {
      navigation.goBack();
    }
  };

  _handleNextAndSubmit = () => {
    const { step } = this.state;
    if (step === 3) {
      // TODO
    } else {
      this.setState({ step: step + 1 });
    }
  };

  _handleChipPress = (label: Enum.Tags) => this.setState({ label });

  _handleNameChange = (name: string) => this.setState({ name });

  _handleDescChange = (desc: string) => this.setState({ desc });

  _handlePressFeelGood = () => this.setState({ feeling: Enum.Feeling.GOOD });

  _handlePressFeelBad = () => this.setState({ feeling: Enum.Feeling.BAD });

  _handlePressImpactEnergy = () => this.setState({ impactType: Enum.ImpactType.ENERGY });

  _handlePressImpactMood = () => this.setState({ impactType: Enum.ImpactType.MOOD });

  _handlePressScore = (score: number) => this.setState({ score });

  _handlePressSaveDraft = () => {
    const { dispatch, navigation } = this.props;
    dispatch(saveDraft(this.state));
    dispatch(showModal({ modalType: Enum.ModalType.DRAFT_SAVED, onModalPress: navigation.goBack }));
  };

  render() {
    const { step, label, name, desc, feeling, impactType, score } = this.state;
    return (
      <Block>
        <Block flex={5}>
          {step === 1 && (
            <Step1
              label={label}
              name={name}
              desc={desc}
              onChipPress={this._handleChipPress}
              onNameChange={this._handleNameChange}
              onDescChange={this._handleDescChange}
            />
          )}
          {step === 2 && (
            <Step2
              name={name}
              label={label}
              feeling={feeling}
              impactType={impactType}
              onPressFeelGood={this._handlePressFeelGood}
              onPressFeelBad={this._handlePressFeelBad}
              onPressImpactEnergy={this._handlePressImpactEnergy}
              onPressImpactMood={this._handlePressImpactMood}
            />
          )}
          {step === 3 && (
            <Step3
              name={name}
              label={label}
              feeling={feeling}
              impactType={impactType}
              score={score}
              onScoring={this._handlePressScore}
            />
          )}
        </Block>
        <Block middle flex={1} style={styles.footerContainer}>
          <Button gradient onPress={this._handleNextAndSubmit} style={styles.nextBtn}>
            <Block center middle>
              <Text style={styles.nextBtnTxt}>
                {step === 3 ? I18n.t('evaluate.footer.finish') : I18n.t('evaluate.footer.next')}
              </Text>
            </Block>
          </Button>
          <Button shadow style={styles.draftBtn} onPress={this._handlePressSaveDraft}>
            <Block center middle>
              <Text>{I18n.t('evaluate.footer.draft')}</Text>
            </Block>
          </Button>
        </Block>
      </Block>
    );
  }
}

export default connect()(Evaluate);
