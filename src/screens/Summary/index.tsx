import React, { useEffect } from 'react';
import { Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import get from 'lodash/get';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Block, Loader } from '../../components';
import { styles } from './styles';
import SummaryHeader from './components/SummaryHeader';
import { Enum } from '../../constants';
import { AppState } from '../../store/types';
import { loadSummary } from '../../store/actions';
import { summaryIcon } from '../../core/utils';
import I18n from '../../core/i18n';

interface TestProps extends NavigationStackScreenProps {}

const Summary: React.FC<TestProps> = ({ navigation }: TestProps) => {
  const type = navigation.getParam('evaluationType', Enum.EvaluationType.OVERALL);
  const summary = useSelector((state: AppState) => state.summary.data);
  const isLoading = useSelector((state: AppState) => state.summary.isFetching);
  const data = get(summary, `${type}.affections`, []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSummary(type));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSummaryHeader = () => {
    const score = get(summary, `${type}.score`, 0);
    return <SummaryHeader type={type} score={score} />;
  };

  const renderSummaryItem = ({ item }: any) => {
    const factors = get(item, 'factors', []);
    const { tags, score } = item;
    return (
      <Block flex={1} row style={styles.itemContainer}>
        <Block top center flex={1}>
          {summaryIcon(score || 0)}
        </Block>
        <Block middle flex={3}>
          <Text style={styles.factorTxt}>{factors}</Text>
        </Block>
        <Block flex={3} middle right row>
          {tags && (
            <Block flex={false} center middle style={styles.chip}>
              <Text>{I18n.t(`evaluate.tags.${tags}`)}</Text>
            </Block>
          )}
        </Block>
      </Block>
    );
  };

  const sortedData = data.sort((item1: any, item2: any) => item2.score - item1.score);

  return (
    <>
      <Loader loading={isLoading} />
      <FlatList
        ListHeaderComponent={renderSummaryHeader}
        data={sortedData}
        renderItem={renderSummaryItem}
        keyExtractor={(_, index) => `summary-${index}`}
      />
    </>
  );
};

export default Summary;
