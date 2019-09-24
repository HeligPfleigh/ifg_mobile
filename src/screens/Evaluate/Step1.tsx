import React, { useEffect, useState } from 'react';
import { Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import uniq from 'lodash/uniq';
import Autocomplete from 'react-native-autocomplete-input';
import { useSelector, useDispatch } from 'react-redux';
import { Block, Button } from '../../components';
import { step1Styles } from './styles';
import I18n from '../../core/i18n';
import { Enum } from '../../constants';
import { AppState } from '../../store/types';
import { getReasons } from '../../store/actions';

interface Step1Props {
  type: Enum.EvaluationType;
  label: string | null;
  name: string;
  desc: string;
  onChipPress: (tag: string) => void;
  onNameChange: (name: string) => void;
  onDescChange: (desc: string) => void;
}

export const Step1: React.FC<Step1Props> = ({
  type,
  label,
  onChipPress,
  onNameChange,
  onDescChange,
  name,
  desc,
}: Step1Props) => {
  const listTags = Enum.tags[`${type}`];
  const reasons = useSelector((state: AppState) => state.myaction.data.reasons);
  const dispatch = useDispatch();
  const [hideResults, setHideResults] = useState(false);

  useEffect(() => {
    dispatch(getReasons(type));
  }, [dispatch, type]);

  let suggestList: string[] = [];

  if (name) {
    suggestList = uniq(reasons.filter((reason: string) => reason.toLowerCase().includes(name)));
  }

  // add blank field in suggest list as required from PO
  if (suggestList.length) {
    suggestList = [...suggestList, ''];
  }

  const handlePressSuggestion = (suggestion: string) => {
    onNameChange(suggestion);
    setHideResults(true);
  };

  const handleChangeText = (text: string) => {
    onNameChange(text);
    setHideResults(false);
  };

  return (
    <ScrollView>
      <Block flex={1} style={step1Styles.container}>
        <Block flex={1} middle style={step1Styles.field}>
          <Block flex={1} center middle>
            <Text style={step1Styles.header}>{I18n.t(`evaluate.step1.header.${type}.name`)}</Text>
          </Block>
          <Block flex={1}>
            <Autocomplete
              hideResults={hideResults}
              autoCapitalize="none"
              autoCorrect={false}
              data={suggestList}
              defaultValue={name}
              onChangeText={handleChangeText}
              placeholder={I18n.t('evaluate.step1.header.input_placeholder')}
              listStyle={step1Styles.autocompleteList}
              keyExtractor={item => `auto-complete-${item}`}
              renderItem={({ item }: { item: string }) => {
                return (
                  <TouchableOpacity onPress={() => handlePressSuggestion(item)} style={step1Styles.autocompleteItem}>
                    <Text>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </Block>
        </Block>
        <Block flex={2} style={step1Styles.field}>
          <Block flex={1} center middle>
            <Text style={step1Styles.header}>{I18n.t('evaluate.step1.header.label')}</Text>
          </Block>
          <Block flex={3} row middle style={{ flexWrap: 'wrap' }}>
            {listTags.map((tag: any) => (
              <Button key={`${tag}`} onPress={() => onChipPress(tag)}>
                <Block
                  flex={false}
                  center
                  middle
                  style={[step1Styles.chip, tag === label ? step1Styles.selectedChip : {}]}
                >
                  <Text style={tag === label ? step1Styles.selectedChipTxt : step1Styles.chipTxt}>
                    {I18n.t(`evaluate.tags.${tag}`)}
                  </Text>
                </Block>
              </Button>
            ))}
          </Block>
        </Block>
        <Block flex={1} style={step1Styles.field}>
          <Block flex={1} center middle>
            <Text style={step1Styles.header}>
              {I18n.t('evaluate.step1.header.desc')}
              <Text style={step1Styles.name}>{I18n.t('evaluate.step1.optional')}</Text>
            </Text>
          </Block>
          <Block flex={1} center>
            <TextInput style={step1Styles.input} onChangeText={onDescChange} value={desc} />
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};
