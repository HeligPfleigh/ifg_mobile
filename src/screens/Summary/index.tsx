import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Chip } from "react-native-paper";
import { Block } from '../../components';
import { FeelGoodLv4, SunImg } from '../../assets/images';
import { styles } from "./styles";
import SummaryHeader from './components/SummaryHeader';

export default class extends Component {
  _renderSummaryHeader = () => <SummaryHeader />

  _renderSummaryItem = ({ item }: any) => {
    return (
      <Block flex={1} row style={styles.itemContainer}>
        <Block middle center flex={1}>
          <FeelGoodLv4 width={30} height={30}/>
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
