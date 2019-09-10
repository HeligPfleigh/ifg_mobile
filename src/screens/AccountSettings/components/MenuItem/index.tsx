import React, { Component } from 'react';
import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import isFunction from 'lodash/isFunction';
import { TouchableWithoutFeedback, Text, GestureResponderEvent } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import styles from './styles';
import { theme } from '../../../../constants';
import { Block } from '../../../../components';

interface IProps {
  itemLabel: string;
  isExpanded?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

interface IStates {
  isExpanded: boolean;
}

class MenuItem extends Component<IProps, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      isExpanded: get(props, 'isExpanded', false),
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    const isExpanded = get(nextProps, 'isExpanded');
    if (!isUndefined(isExpanded) && isExpanded !== prevState.isExpanded) {
      return { ...prevState, isExpanded }; // <- this is setState equivalent
    }
    return null;
  }

  toggleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    const { isExpanded } = this.state;
    const { itemLabel, onPress } = this.props;
    return (
      <TouchableWithoutFeedback onPress={!isFunction(onPress) ? this.toggleExpand : onPress}>
        <Block flex={false} row style={styles.container}>
          <Block left flex={1}>
            <Text style={styles.label}>{itemLabel}</Text>
          </Block>
          <Block right flex={false}>
            <SimpleLineIcons
              size={theme.sizes.base}
              color={theme.colors.black}
              name={isExpanded ? 'arrow-down' : 'arrow-right'}
            />
          </Block>
        </Block>
      </TouchableWithoutFeedback>
    );
  }
}

export default MenuItem;
