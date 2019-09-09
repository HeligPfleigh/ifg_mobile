import React from 'react';
import { Text } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Block from '../../Block';
import { theme } from '../../../constants';
import styles from './styles';

interface IProps {
  input: any;
  label: string;
  datasource: any;
}

const DropdownField: React.FC<IProps> = (props: IProps) => {
  const {
    label,
    datasource,
    input: { onChange, value },
  } = props;

  return (
    <Block flex={false} style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Dropdown
        data={datasource}
        value={value}
        rippleColor={theme.colors.gray}
        dropdownOffset={{ top: 5, left: 0 }}
        onChangeText={onChange}
      />
    </Block>
  );
};

export default DropdownField;
