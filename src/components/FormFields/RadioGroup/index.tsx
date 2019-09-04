import React from 'react';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../../constants';

interface IRadioGroupProps {
  horizontal?: boolean;
  circleColor?: string;
  labelColor?: string;
  circleStyle?: any;
  circleSize?: number;
  labelStyle?: any;
  containerStyle?: any;
  contentStyle?: any;
  onPress: (value: string) => void;
  selectedValue: string;
  values: { label: string; value: any }[];
}

const RadioGroup = ({
  values,
  selectedValue,
  onPress,
  horizontal,
  containerStyle,
  circleStyle,
  labelStyle,
  circleSize = 10,
  contentStyle,
  circleColor = theme.colors.black,
  labelColor = theme.colors.black,
}: IRadioGroupProps) => {
  // component default styles
  const mainStyles = StyleSheet.create({
    container: {
      flexDirection: horizontal ? 'column' : 'row',
    },
    contentStyles: {
      marginRight: 10,
      flexDirection: 'row',
    },
    circleStyle: {
      width: circleSize + 8,
      height: circleSize + 8,
      borderRadius: (circleSize + 8) / 2,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 5,
      borderColor: circleColor,
    },
    dotStyles: {
      width: circleSize,
      height: circleSize,
      borderRadius: circleSize / 2,
      backgroundColor: circleColor,
    },
    labelStyle: {
      color: labelColor,
      fontSize: theme.sizes.base,
    },
  });

  // add custom container style
  let containerStyles = [mainStyles.container];
  if (!isUndefined(containerStyle)) {
    if (!isArray(containerStyle)) {
      containerStyles = [...containerStyles, containerStyle];
    } else {
      containerStyles = [...containerStyles, ...containerStyle];
    }
  }

  // add custom content style
  let contentStyles = [mainStyles.contentStyles];
  if (!isUndefined(contentStyle)) {
    if (!isArray(contentStyle)) {
      contentStyles = [...contentStyles, contentStyle];
    } else {
      contentStyles = [...contentStyles, ...contentStyle];
    }
  }

  // add custom circle style
  let circleStyles = [mainStyles.circleStyle];
  if (!isUndefined(circleStyle)) {
    if (!isArray(circleStyle)) {
      circleStyles = [...circleStyles, circleStyle];
    } else {
      circleStyles = [...circleStyles, ...circleStyle];
    }
  }

  // add custom circle style
  let labelStyles = [mainStyles.labelStyle];
  if (!isUndefined(labelStyle)) {
    if (!isArray(labelStyle)) {
      labelStyles = [...labelStyles, labelStyle];
    } else {
      labelStyles = [...labelStyles, ...labelStyle];
    }
  }

  return (
    <View style={containerStyles}>
      {values.map(({ label, value }) => (
        <TouchableOpacity key={label} style={contentStyles} onPress={() => onPress(value)}>
          <View style={circleStyles}>{isEqual(selectedValue, value) && <View style={mainStyles.dotStyles} />}</View>
          <Text style={labelStyles}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioGroup;
