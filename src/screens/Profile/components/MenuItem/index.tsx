import React, { Component } from 'react';
import noop from 'lodash/noop';
import { Text, TouchableOpacity, GestureResponderEvent, View } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import { styles } from './styles';
import { theme } from '../../../../constants';
import { Block } from '../../../../components';

interface MenuItemProps {
  iconName: string;
  iconSize?: number;
  itemLabel: string;
  iconColor?: string;
  labelColor?: string;
  backgroundColor?: string;
  isNavigator?: boolean;
  isShadow?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

export default class MenuItem extends Component<MenuItemProps> {
  render() {
    const {
      itemLabel,
      iconName,
      onPress = noop,
      isNavigator = true,
      iconSize = theme.sizes.base,
      iconColor = theme.colors.blue,
      labelColor = theme.colors.black,
      backgroundColor = theme.colors.white,
      isShadow = true,
    } = this.props;
    const iconStyles = [styles.roundContainer, { borderColor: iconColor }];
    const labelStyles = [styles.label, { color: labelColor }];
    // const contentStyles = [styles.content, { backgroundColor }];
    const contentStyles = isShadow
      ? [styles.content, styles.shadow, { backgroundColor }]
      : [styles.content, { backgroundColor }];
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Block row style={contentStyles}>
          <Block flex={false} style={{ width: 50 }}>
            <View style={iconStyles}>
              <SimpleLineIcons name={iconName} color={iconColor} size={iconSize} />
            </View>
          </Block>
          <Block left flex={2}>
            <Text style={labelStyles}>{itemLabel}</Text>
          </Block>
          {isNavigator && (
            <Block flex={0.2} right row>
              <SimpleLineIcons name="arrow-right" size={theme.sizes.base} />
            </Block>
          )}
        </Block>
      </TouchableOpacity>
    );
  }
}
