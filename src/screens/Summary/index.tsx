import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import get from 'lodash/get';

import { Block } from '../../components';
import { styles } from './styles';
import SummaryHeader from './components/SummaryHeader';
import { Enum } from '../../constants';
import { AppState, SummaryState } from '../../store/types';
import { loadSummary } from '../../store/actions';
import { summaryIcon } from '../../core/utils';

interface SummaryProps {
  dispatch: Dispatch<any>;
  navigation: NavigationScreenProp<NavigationState>;
  summary: SummaryState;
}

class Summary extends Component<SummaryProps> {
  componentDidMount() {
    const { navigation, dispatch } = this.props;
    const type = navigation.getParam(Enum.NavigationParamsName.EVALUATION_TYPE, Enum.EvaluationType.OVERALL);
    dispatch(loadSummary(type));
  }

  _renderSummaryHeader = () => {
    const { navigation, summary } = this.props;
    const type = navigation.getParam(Enum.NavigationParamsName.EVALUATION_TYPE, Enum.EvaluationType.OVERALL);
    const score = get(summary, `data.${type}.score`, 0);
    return <SummaryHeader type={type} score={score} />;
  };

  _renderSummaryItem = ({ item }: any) => {
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
              <Text>{tags}</Text>
            </Block>
          )}
        </Block>
      </Block>
    );
  };

  render() {
    const { navigation, summary } = this.props;
    const type = navigation.getParam('evaluationType', Enum.EvaluationType.OVERALL);
    const data = get(summary, `data.${type}.affections`, []);
    return (
      <FlatList
        ListHeaderComponent={this._renderSummaryHeader}
        data={data}
        renderItem={this._renderSummaryItem}
        keyExtractor={(_, index) => `summary-${index}`}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  summary: state.summary,
});

export default connect(
  mapStateToProps,
  null,
)(Summary);
