import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Chip } from "react-native-paper";
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import get from 'lodash/get';

import { Block } from '../../components';
import { FeelGoodLv4 } from '../../assets/images';
import { styles } from "./styles";
import SummaryHeader from './components/SummaryHeader';
import { theme } from '../../constants';
import { AppState, SummaryState } from '../../store/types';
import { loadSummary } from "../../store/actions";



interface SummaryProps {
  dispatch: Dispatch<any>;
  navigation: NavigationScreenProp<NavigationState>;
  summary: SummaryState;
}

class Summary extends Component<SummaryProps> {
  _renderSummaryHeader = () => {
    const { navigation, summary } = this.props;
    const type = navigation.getParam('evaluationType', theme.EvaluationType.OVERALL);
    const score = get(summary, `data.${type}.score`, 0);
    return (<SummaryHeader type={type} score={score} />);
  }

  _renderSummaryItem = ({ item }: any) => {
    return (
      <Block flex={1} row style={styles.itemContainer}>
        <Block middle center flex={1}>
          <FeelGoodLv4 width={30} height={30} />
        </Block>
        <Block middle flex={3}>
          <Text>Sam</Text>
        </Block>
        <Block flex={3} middle right row>
          <Chip style={styles.chip}>Example Chip</Chip>
        </Block>
      </Block>
    )
  }

  componentDidMount() {
    const { navigation, dispatch } = this.props;
    dispatch(loadSummary(navigation.getParam('evaluationType', theme.EvaluationType.OVERALL)))
  }

  render() {
    return (
      <FlatList
        ListHeaderComponent={this._renderSummaryHeader}
        data={[{ key: 'a' }, { key: 'b' }]}
        renderItem={this._renderSummaryItem}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  summary: state.summary
})

export default connect(mapStateToProps, null)(Summary);
