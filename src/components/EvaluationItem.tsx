import React, { Component, ReactNode, ReactElement } from 'react';
import { Text, GestureResponderEvent, View, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../constants';
import { Block, Button } from '.';

interface EvaluationItemProps {
  colors: string[];
  header?: string;
  headerColor?: string;
  icon?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  textColor?: string;
  detailComponent?: ReactElement;
  round?: boolean;
}

interface RoundIconProps {
  icon?: ReactNode;
  colors: string[];
  size: number;
}

interface RoundIconBtnProps {
  icon: ReactNode;
  colors: string[];
  text: string;
  onPress: () => void;
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
  },
  roundBtnContainer: {
    alignItems: 'center',
    marginHorizontal: theme.sizes.margin,
    backgroundColor: theme.colors.white2,
  },
  roundBtnTxt: {
    fontSize: theme.sizes.base / 2,
    textAlign: 'center',
  },
});

const RoundIcon: React.FC<RoundIconProps> = ({ icon, colors, size }: RoundIconProps) => (
  <LinearGradient
    colors={colors}
    start={{ x: 0.0, y: 0.0 }}
    end={{ x: 0.0, y: 1.0 }}
    style={[styles.roundContainer, { width: size, height: size }]}
  >
    <Block flex={false} style={[styles.iconContainer, { width: size * 0.9, height: size * 0.9 }]}>
      {icon}
    </Block>
  </LinearGradient>
);

export const RoundIconButton: React.FC<RoundIconBtnProps> = ({ icon, colors, text, onPress }: RoundIconBtnProps) => (
  <Button onPress={onPress} style={styles.roundBtnContainer}>
    <RoundIcon icon={icon} colors={colors} size={40} />
    <Text style={styles.roundBtnTxt}>{text}</Text>
  </Button>
);

export default class EvaluationItem extends Component<EvaluationItemProps> {
  static defaultProps: EvaluationItemProps;

  render() {
    const { colors, header, headerColor, icon, onPress, detailComponent, round } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Block flex={false} row style={styles.container}>
          {icon &&
            (round ? (
              <RoundIcon icon={icon} colors={colors} size={80} />
            ) : (
              <Block flex={false} style={styles.iconContainer}>
                {icon}
              </Block>
            ))}

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
  round: true,
};
