import React from 'react';
import { Text, TextInput } from 'react-native';

import { Block, Button } from '../../components';
import { step1Styles } from './styles';
import I18n from '../../core/i18n';
import { Enum } from '../../constants';

interface Step1Props {
  label: Enum.Tags | null;
  name: string;
  desc: string;
  onChipPress: (tag: Enum.Tags) => void;
  onNameChange: (name: string) => void;
  onDescChange: (desc: string) => void;
}

export const Step1: React.FC<Step1Props> = ({
  label,
  onChipPress,
  onNameChange,
  onDescChange,
  name,
  desc,
}: Step1Props) => {
  return (
    <Block flex={1} style={step1Styles.container}>
      <Block flex={1} middle>
        <Block flex={1} center middle>
          <Text style={step1Styles.header}>{I18n.t('evaluate.step1.header.name')}</Text>
        </Block>
        <Block flex={1}>
          <Text style={step1Styles.name}>{I18n.t('evaluate.step1.name')}</Text>
          <TextInput style={step1Styles.input} onChangeText={onNameChange} value={name} />
        </Block>
      </Block>
      <Block flex={1}>
        <Block flex={1} center middle>
          <Text style={step1Styles.header}>{I18n.t('evaluate.step1.header.label')}</Text>
        </Block>
        <Block flex={3} row style={{ flexWrap: 'wrap' }}>
          {Object.values(Enum.Tags).map(tag => (
            <Button key={`${tag}`} onPress={() => onChipPress(tag)}>
              <Block
                flex={false}
                center
                middle
                style={[step1Styles.chip, tag === label ? step1Styles.selectedChip : {}]}
              >
                <Text style={tag === label ? step1Styles.selectedChipTxt : {}}>{tag}</Text>
              </Block>
            </Button>
          ))}
        </Block>
      </Block>
      <Block flex={1}>
        <Block flex={1} center middle>
          <Text style={step1Styles.header}>{I18n.t('evaluate.step1.header.desc')}</Text>
          <Text style={step1Styles.name}>{I18n.t('evaluate.step1.optional')}</Text>
        </Block>
        <Block flex={1} center>
          <TextInput style={step1Styles.input} onChangeText={onDescChange} value={desc} />
        </Block>
      </Block>
    </Block>
  );
};
