import { connect } from 'react-redux';
import React, { Component } from 'react';

import { theme } from '../../../../../constants';
import { Block } from '../../../../../components';
import { RadioGroup } from '../../../../../components/FormFields';
import styles from './styles';

interface IStates {
  itemSelected: any;
}

const languages = [{ label: 'English', value: 'en' }, { label: 'Français', value: 'rf' }];

class LanguageSetting extends Component<{}, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      itemSelected: 0,
    };
  }

  onSelected = (value: any) => {
    this.setState({
      itemSelected: value,
    });
  };

  render() {
    const { itemSelected } = this.state;
    return (
      <Block flex={false} style={styles.container}>
        <RadioGroup
          values={languages}
          selectedValue={itemSelected}
          circleColor={theme.colors.blue}
          contentStyle={{ paddingTop: 5, paddingBottom: 5 }}
          onPress={this.onSelected}
        />
      </Block>
    );
  }
}

export default connect()(LanguageSetting);
