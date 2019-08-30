import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { theme } from '../../constants';
import { Block } from '../../components';
import I18n from '../../core/i18n';

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    paddingHorizontal: theme.sizes.padding,
    fontSize: theme.sizes.h2,
    paddingVertical: theme.sizes.margin,
  },
  item: {
    marginVertical: theme.sizes.margin,
    paddingVertical: theme.sizes.margin,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    paddingLeft: theme.sizes.padding,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default class AchievedActions extends Component {
  _renderAchievedAction = () => {
    return (
      <Block flex={false} row style={styles.item}>
        <Text>Measdf asdfjlak askdjflkad aksdjflkas asjdfkasd asjdfkals aljdfklasj asdfjklasjdf asdk qwenrm;</Text>
      </Block>
    );
  };

  render() {
    return (
      <Block center>
        <Text style={styles.header}>{I18n.t('achieved_actions.header')}</Text>
        <ScrollView>
          {this._renderAchievedAction()}
          {this._renderAchievedAction()}
          {this._renderAchievedAction()}
        </ScrollView>
      </Block>
    );
  }
}
