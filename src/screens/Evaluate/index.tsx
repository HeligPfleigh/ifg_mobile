import React, { Component } from 'react';
import { Text } from 'react-native';
import { HeaderBackButton, NavigationScreenProps } from 'react-navigation';
import noop from 'lodash/noop';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Block, Button } from '../../components';
import I18n from '../../core/i18n';
import { styles } from './styles';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Enum, theme } from '../../constants';
import { showModal, saveDraft } from '../../store/actions';
import api from '../../core/api';

interface EvaluateProps extends NavigationScreenProps {
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
  disableNextBtn: boolean;
}

class Evaluate extends Component<EvaluateProps, EvaluateState> {
  static navigationOptions = ({ navigation }: any) => {
    const evaluationType = navigation.getParam(Enum.NavigationParamsName.EVALUATION_TYPE);
    const title = evaluationType ? I18n.t(`summary.${evaluationType}`) : I18n.t('navigation.evaluate');
    return {
      title,
      headerLeft: () => (
        <HeaderBackButton tintColor={theme.colors.black} onPress={navigation.getParam('handleBack', noop)} />
      ),
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
      disableNextBtn: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const type = navigation.getParam(Enum.NavigationParamsName.EVALUATION_TYPE, null);
    const draftData = navigation.getParam(Enum.NavigationParamsName.EVALUATION_DATA, null);
    navigation.setParams({ handleBack: this._handleBack });
    if (!draftData) {
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
      this.setState({ step: step - 1, disableNextBtn: false });
    } else {
      navigation.goBack();
    }
  };

  _handleNextAndSubmit = async () => {
    const { step, type, name, score, label, impactType, desc } = this.state;
    const { navigation, dispatch } = this.props;
    if (step === 3 && type && label && impactType) {
      try {
        await api.createEvaluation({
          evaluationType: type,
          influentFactor: name,
          score,
          labelTag: label,
          impactType,
          description: desc,
        });
        dispatch(showModal({ modalType: Enum.ModalType.EVALUATION_SAVED, onModalPress: navigation.goBack }));
      } catch (err) {
        // TODO
      }
    } else {
      this.setState({ step: step + 1, disableNextBtn: true });
    }
  };

  _enableNextBtn = () => {
    const { step, name, label, feeling, impactType, score } = this.state;
    switch (step) {
      case 1:
        if (!name || !label) {
          this.setState({ disableNextBtn: true });
          return;
        }
        break;
      case 2:
        if (!feeling || !impactType) return;
        break;
      case 3:
        if (!score) return;
        break;
      default:
    }
    this.setState({ disableNextBtn: false });
  };

  _handleChipPress = (label: Enum.Tags) => this.setState({ label }, this._enableNextBtn);

  _handleNameChange = (name: string) => this.setState({ name }, this._enableNextBtn);

  _handleDescChange = (desc: string) => this.setState({ desc });

  _handlePressFeelGood = () => this.setState({ feeling: Enum.Feeling.GOOD }, this._enableNextBtn);

  _handlePressFeelBad = () => this.setState({ feeling: Enum.Feeling.BAD }, this._enableNextBtn);

  _handlePressImpactEnergy = () => this.setState({ impactType: Enum.ImpactType.ENERGY }, this._enableNextBtn);

  _handlePressImpactMood = () => this.setState({ impactType: Enum.ImpactType.MOOD }, this._enableNextBtn);

  _handlePressScore = (score: number) => this.setState({ score }, this._enableNextBtn);

  _handlePressSaveDraft = () => {
    const { dispatch, navigation } = this.props;
    dispatch(saveDraft(this.state));
    dispatch(showModal({ modalType: Enum.ModalType.DRAFT_SAVED, onModalPress: navigation.goBack }));
  };

  render() {
    const { step, label, name, desc, feeling, impactType, score, disableNextBtn } = this.state;
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
          <Button
            gradient={!disableNextBtn}
            disabled={disableNextBtn}
            onPress={this._handleNextAndSubmit}
            style={styles.nextBtn}
          >
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
