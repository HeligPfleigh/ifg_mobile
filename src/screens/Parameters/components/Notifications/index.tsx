import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Text } from 'react-native';

import I18n from '../../../../core/i18n';
import { theme } from '../../../../constants';
import { Block } from '../../../../components';
import { RadioGroup } from '../../../../components/FormFields';
import styles from './styles';

interface IStates {
  itemSelected: any;
}

const data = [{ label: 'Yes', value: 1 }, { label: `I DON'T need feel good information`, value: 0 }];

class MotivationMessages extends Component<{}, IStates> {
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
      <Block style={styles.container}>
        <Block left flex={false} style={{ maxHeight: 155, marginBottom: 5 }}>
          <Text style={styles.title}>{I18n.t('profile.account_parameters.notifications')}</Text>
          <Text style={styles.subtitle}>{I18n.t('profile.account_parameters.notifications_subtitle')}</Text>
        </Block>
        <RadioGroup
          horizontal
          values={data}
          selectedValue={itemSelected}
          circleColor={theme.colors.blue}
          contentStyle={styles.radioGroup}
          labelStyle={styles.radioLabel}
          onPress={this.onSelected}
        />
      </Block>
    );
  }
}

export default connect()(MotivationMessages);
