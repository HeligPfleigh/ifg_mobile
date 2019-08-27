import React, { Component } from 'react';
import { Text, TouchableOpacity, GestureResponderEvent, View } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from './styles';
import { theme } from '../../../../constants';
import { Block } from '../../../../components';

interface MenuItemProps {
  iconName: string;
  iconSize?: number;
  itemLabel: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export default class MenuItem extends Component<MenuItemProps> {
  render() {
    const { onPress, itemLabel, iconName, iconSize } = this.props;
    return (
      <Block row style={styles.container}>
        <Block flex={false} style={{ width: 50 }}>
          <View style={styles.roundContainer}>
            <SimpleLineIcons name={iconName} color={theme.colors.blue} size={iconSize || theme.sizes.base} />
          </View>
        </Block>
        <Block left flex={2}>
          <Text style={styles.label}>{itemLabel}</Text>
        </Block>
        <Block flex={1} right row>
          <TouchableOpacity onPress={onPress}>
            <MaterialCommunityIcons name="chevron-right" size={theme.sizes.innerIcon} />
          </TouchableOpacity>
        </Block>
      </Block>
    );
  }
}
