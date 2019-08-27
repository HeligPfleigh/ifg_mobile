import React, { Component } from 'react';
import { Text } from 'react-native';
import { NavigationScreenProp, NavigationState, HeaderBackButton } from 'react-navigation';
import noop from 'lodash/noop';

import { Block, Button } from '../../components';
import I18n from '../../core/i18n';
import { styles } from './styles';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Enum } from '../../constants';

interface EvaluateProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface EvaluateState {
  type: Enum.EvaluationType | null;
  step: number;
  name: string;
  label: Enum.Tags | null;
  desc: string;
  feeling: Enum.Feeling | null;
  impactType: Enum.ImpactType | null;
  score: number;
}

export default class Evaluate extends Component<EvaluateProps, EvaluateState> {
  static navigationOptions = ({ navigation }: any) => {
    const evaluationType = navigation.getParam('evaluationType');
    const title = evaluationType ? I18n.t(`summary.${evaluationType}`) : I18n.t('navigation.evaluate');
    return {
      title,
      headerLeft: () => <HeaderBackButton onPress={navigation.getParam('handleBack', noop)} />,
    };
  };

  constructor(props: EvaluateProps) {
    super(props);
    this.state = {
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
    const type = navigation.getParam('evaluationType', null);
    navigation.setParams({ handleBack: this._handleBack });
    this.setState({ type });
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
    console.log(this.state.type);
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
          <Button shadow style={styles.draftBtn}>
            <Block center middle>
              <Text>{I18n.t('evaluate.footer.draft')}</Text>
            </Block>
          </Button>
        </Block>
      </Block>
    );
  }
}
