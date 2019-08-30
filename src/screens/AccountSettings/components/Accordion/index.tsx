import React, { Component, ReactNode } from 'react';
import { Text, GestureResponderEvent } from 'react-native';
import omit from 'lodash/omit';
import isFunction from 'lodash/isFunction';

import { Block } from '../../../../components';
import MenuItem from '../MenuItem';
import styles from './styles';

interface IProps {
  itemLabel: string;
  childComponent: ReactNode | string;
  onPress?: (event: GestureResponderEvent) => void;
}

interface IStates {
  isExpanded: boolean;
}

class Accordion extends Component<IProps, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  toggleExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  renderChildComponent = () => {
    const { childComponent } = this.props;

    if (typeof childComponent === 'string') {
      return (
        <Block flex={false} style={styles.child}>
          <Text>{childComponent}</Text>
        </Block>
      );
    }

    return childComponent;
  };

  render() {
    const { isExpanded } = this.state;
    const menuItemProps = {
      ...omit(this.props, ['onPress', 'childComponent']),
      onPress: !isFunction(this.props.onPress) ? this.toggleExpand : this.props.onPress,
    };
    return (
      <React.Fragment>
        <MenuItem {...menuItemProps} isExpanded={isExpanded} />
        {isExpanded && this.renderChildComponent()}
      </React.Fragment>
    );
  }
}

export default Accordion;
