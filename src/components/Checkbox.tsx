import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Block } from '.';
import { theme } from '../constants';

interface CheckboxProps {
  size: number;
  checked: boolean;
  onPress?: (e: GestureResponderEvent) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ size, checked, onPress }: CheckboxProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Block
        flex={false}
        center
        middle
        style={{
          width: size,
          height: size,
          borderWidth: 1,
          borderColor: checked ? theme.colors.blue : theme.colors.gray,
        }}
      >
        {checked && <MaterialCommunityIcons size={size * 0.8} name="check" color={theme.colors.blue} />}
      </Block>
    </TouchableOpacity>
  );
};

export default Checkbox;
