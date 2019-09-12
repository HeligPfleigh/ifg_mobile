import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, TextStyle } from 'react-native';

import I18n from '../core/i18n';

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});

interface I18nTitleProps {
  text: string;
  style?: TextStyle;
}

class Test extends React.Component<I18nTitleProps> {
  render() {
    const { text, style } = this.props;

    return <Text style={[styles.text, style]}>{I18n.t(text)}</Text>;
  }
}

const mapStateToProps = state => ({
  lang: state.language.locale,
});

export default connect(mapStateToProps)(Test);
