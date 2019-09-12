import React from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet } from 'react-native';

import I18n from '../core/i18n';

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});

class Test extends React.Component {
  render() {
    // eslint-disable-next-line react/prop-types
    return <Text style={styles.text}>{I18n.t(this.props.text)}</Text>;
  }
}

const mapStateToProps = state => ({
  lang: state.language.locale,
});

export default connect(mapStateToProps)(Test);
