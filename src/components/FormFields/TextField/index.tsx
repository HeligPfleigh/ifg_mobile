import React, { Component } from 'react';
import get from 'lodash/get';
import { TextField } from 'react-native-material-textfield';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../../constants';

interface IProps {
  meta: any;
  input: any;
  label: string;
  title?: string;
  returnKeyLabel?: string;
  autoCorrect?: boolean;
  autoCapitalize?: string;
  clearTextOnFocus?: boolean;
  characterRestriction?: number;
  secureTextEntry?: boolean;
  enablesReturnKeyAutomatically?: boolean;
  onSubmitEditing?: (event: any) => void;
}

interface IStates {
  isRenderAccessory: boolean;
}

class MyTextField extends Component<IProps, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      isRenderAccessory: get(props, 'secureTextEntry', false),
    };
  }

  onAccessoryPress = () => {
    this.setState({ isRenderAccessory: !this.state.isRenderAccessory });
  };

  renderPasswordAccessory = () => {
    const { secureTextEntry } = this.props;
    const { isRenderAccessory } = this.state;
    const name = isRenderAccessory ? 'eye-off' : 'eye';
    return secureTextEntry ? (
      <Icon size={24} name={name} color={theme.colors.black} onPress={this.onAccessoryPress} suppressHighlighting />
    ) : null;
  };

  render() {
    const {
      label,
      meta: { error, touched },
      input: { onChange, ...restInput },
      ...ownProps
    } = this.props;

    return (
      <TextField
        {...restInput}
        label={label}
        labelHeight={18}
        labelFontSize={14}
        {...ownProps}
        onChangeText={onChange}
        error={touched ? error : undefined}
        secureTextEntry={this.state.isRenderAccessory}
        renderAccessory={this.renderPasswordAccessory}
        autoCapitalize="none"
      />
    );
  }
}

export default MyTextField;
