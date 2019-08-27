import React, { Component, ReactNode, ReactElement } from 'react';
import { Text, GestureResponderEvent, View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../constants';
import { Block } from '.';

interface EvaluationItemProps {
  colors: string[];
  header?: string;
  headerColor?: string;
  icon?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  textColor?: string;
  detailComponent: ReactElement;
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    marginTop: theme.sizes.margin,
    marginBottom: theme.sizes.margin,
    padding: theme.sizes.margin,
    borderRadius: theme.sizes.base,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  roundContainer: {
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  iconContainer: {
    width: 72,
    height: 72,
    backgroundColor: theme.colors.white,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: theme.sizes.margin,
  },
  header: {
    fontSize: theme.sizes.header,
    marginBottom: theme.sizes.margin,
  },
});

export default class EvaluationItem extends Component<EvaluationItemProps> {
  static defaultProps: EvaluationItemProps;

  render() {
    const { colors, header, headerColor, icon, onPress, detailComponent } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Block flex={false} row style={styles.container}>
          {icon && (
            <LinearGradient
              colors={colors}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 0.0, y: 1.0 }}
              style={styles.roundContainer}
            >
              <Block flex={false} style={styles.iconContainer}>
                {icon}
              </Block>
            </LinearGradient>
          )}

          <Block flex={5} style={styles.textContainer}>
            <Text style={[styles.header, { color: headerColor }]}>{header}</Text>
            {detailComponent}
          </Block>
          <Block flex={false}>
            <MaterialCommunityIcons name="chevron-right" color={theme.colors.gray} size={theme.sizes.icon} />
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

EvaluationItem.defaultProps = {
  colors: ['#00FFFF', '#8000FF'],
  headerColor: '#00FFFF',
  textColor: theme.colors.gray,
  detailComponent: <View />,
};
