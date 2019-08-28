import React, { Component } from 'react';
import { Text, GestureResponderEvent } from 'react-native';

import styles from './styles';
import { Block } from '../../../../../components';

interface IProps {
  itemLabel: string;
  onPress?: (event: GestureResponderEvent) => void;
}

interface IStates {
  isExpanded: boolean;
}

class ChangePassword extends Component<IProps, IStates> {
  render() {
    const { itemLabel } = this.props;
    return (
      <Block flex={false} center style={styles.container}>
        <Text style={styles.label}>{itemLabel}</Text>
      </Block>
    );
  }
}

export default ChangePassword;
