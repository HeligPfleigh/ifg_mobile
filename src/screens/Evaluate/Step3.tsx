import React from 'react';
import { Text } from 'react-native';

import { Block, Button } from '../../components';
import { step3Styles } from './styles';
import I18n from '../../core/i18n';
import { FeelGoodLv4, MoodImg, EnergyImg, FeelGoodLv0 } from '../../assets/images';
import { Enum, theme } from '../../constants';

interface Step3Props {
  name: string;
  label: string | null;
  feeling: Enum.Feeling | null;
  impactType: Enum.ImpactType | null;
  onScoring: (score: number) => void;
  score: number;
}

export const Step3: React.FC<Step3Props> = ({ name, label, feeling, impactType, onScoring, score }: Step3Props) => {
  const good = [
    { color: '#056404', score: 5, label: I18n.t('evaluate.step3.huge') },
    { color: '#219C20', score: 4 },
    { color: '#54AF53', score: 3 },
    { color: '#FFC732', score: 2 },
    { color: '#FFDB6E', score: 1, label: I18n.t('evaluate.step3.slight') },
  ];

  const bad = [
    { color: '#FFB585', score: -1, label: I18n.t('evaluate.step3.slight') },
    { color: '#FF9957', score: -2 },
    { color: '#F41228', score: -3 },
    { color: '#D90606', score: -4 },
    { color: '#B10000', score: -5, label: I18n.t('evaluate.step3.huge') },
  ];

  const scores = feeling === Enum.Feeling.GOOD ? good : bad;
  const feelingComponent = feeling === Enum.Feeling.GOOD ? <FeelGoodLv4 /> : <FeelGoodLv0 />;
  const impactComponent =
    impactType === Enum.ImpactType.ENERGY ? <EnergyImg width={40} height={40} /> : <MoodImg width={40} height={40} />;
  return (
    <Block flex={1} style={step3Styles.container}>
      <Block flex={false} row style={step3Styles.frame}>
        <Block flex={1} middle style={step3Styles.leftFrame}>
          <Text>{name}</Text>
        </Block>
        <Block flex={3} row right center style={step3Styles.rightFrame}>
          <Text style={step3Styles.name}>{I18n.t(`evaluate.tags.${label}`)}</Text>
          {feelingComponent}
          {impactComponent}
        </Block>
      </Block>
      <Block flex={false} column center>
        <Text style={step3Styles.header}>{I18n.t('evaluate.step3.header')}</Text>
      </Block>
      <Block flex={1} middle>
        {scores.map(spec => {
          let blockBackground = {};
          if (score) {
            blockBackground =
              score === spec.score
                ? { backgroundColor: theme.colors.purple1 }
                : { backgroundColor: theme.colors.gray2 };
          } else {
            blockBackground = { backgroundColor: spec.color };
          }
          return (
            <Button onPress={() => onScoring(spec.score)} key={`spec-${spec.score}`}>
              <Block flex={1} center middle style={[step3Styles.spectrum, blockBackground]}>
                <Text style={step3Styles.score}>{spec.score}</Text>
                {spec.label && <Text style={step3Styles.score_label}>{spec.label}</Text>}
              </Block>
            </Button>
          );
        })}
      </Block>
    </Block>
  );
};
