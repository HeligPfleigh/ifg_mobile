import React from 'react';
import { Left, Header as NbHeader, Body, Right } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { withNavigation } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { theme } from '../../constants';

MaterialIcons.loadFont();

const Header: React.FC<any> = (props: any) => {
  const _navigateBack = () => {
    props.navigation.goBack();
  };

  return (
    <NbHeader style={styles.header}>
      <Left>
        <TouchableOpacity onPress={_navigateBack}>
          {props.left || <MaterialIcons size={theme.sizes.icon} name="keyboard-backspace" color={theme.colors.gray4} />}
        </TouchableOpacity>
      </Left>
      <Body>{props.body && props.body}</Body>
      <Right>{props.right && props.right}</Right>
    </NbHeader>
  );
};

export default withNavigation(Header);
