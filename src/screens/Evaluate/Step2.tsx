import React, { ReactElement } from 'react';
import { Text } from 'react-native';

import { Block, Button } from '../../components';
import { step2Styles } from './styles';
import I18n from '../../core/i18n';
import { FeelGoodLv4, FeelGoodLv0, EnergyImg, MoodImg } from '../../assets/images';
import { Enum } from '../../constants';

interface CardProps {
  text: string;
  icon: ReactElement;
  selected: boolean;
}

interface Step2Props {
  type: Enum.EvaluationType;
  name: string;
  label: string | null;
  feeling: Enum.Feeling | null;
  impactType: Enum.ImpactType | null;
  onPressFeelGood: () => void;
  onPressFeelBad: () => void;
  onPressImpactEnergy: () => void;
  onPressImpactMood: () => void;
}

const Card: React.FC<CardProps> = ({ text, icon, selected }: CardProps) => (
  <Block center middle flex={false} style={[step2Styles.card, selected ? {} : step2Styles.selected]}>
    <Text style={step2Styles.cardHeader}>{text}</Text>
    {icon}
  </Block>
);

export const Step2: React.FC<Step2Props> = ({
  type,
  name,
  label,
  feeling,
  impactType,
  onPressFeelGood,
  onPressFeelBad,
  onPressImpactEnergy,
  onPressImpactMood,
}: Step2Props) => {
  return (
    <Block flex={1} style={step2Styles.container}>
      <Block flex={false} row style={step2Styles.frame}>
        <Block flex={3} middle style={step2Styles.leftFrame}>
          <Text>{name}</Text>
        </Block>
        <Block flex={1} center middle style={step2Styles.rightFrame}>
          <Text style={step2Styles.name}>{I18n.t(`evaluate.tags.${label}`)}</Text>
        </Block>
      </Block>
      <Block flex={1}>
        <Block center middle flex={false}>
          <Text style={step2Styles.header}>{I18n.t(`evaluate.step2.${type}.feelling`)}</Text>
        </Block>
        <Block flex={1} row middle center>
          <Button onPress={onPressFeelGood}>
            <Card
              selected={feeling === Enum.Feeling.GOOD}
              text={I18n.t('evaluate.step2.feel')}
              icon={<FeelGoodLv4 width={60} height={60} />}
            />
          </Button>
          <Button onPress={onPressFeelBad}>
            <Card
              selected={feeling === Enum.Feeling.BAD}
              text={I18n.t('evaluate.step2.feel')}
              icon={<FeelGoodLv0 width={60} height={60} />}
            />
          </Button>
        </Block>
      </Block>
      <Block flex={1}>
        <Block center middle flex={false}>
          <Text style={step2Styles.header}>{I18n.t('evaluate.step2.and')}</Text>
        </Block>
        <Block flex={1} row middle center>
          <Button onPress={onPressImpactEnergy}>
            <Card
              selected={impactType === Enum.ImpactType.ENERGY}
              text={I18n.t('evaluate.step2.energy')}
              icon={<EnergyImg width={60} height={60} />}
            />
          </Button>
          <Button onPress={onPressImpactMood}>
            <Card
              selected={impactType === Enum.ImpactType.MOOD}
              text={I18n.t('evaluate.step2.mood')}
              icon={<MoodImg width={60} height={60} />}
            />
          </Button>
        </Block>
      </Block>
    </Block>
  );
};
