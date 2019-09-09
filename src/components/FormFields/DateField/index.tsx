import React, { Component } from 'react';
import moment from 'moment';
import get from 'lodash/get';
import noop from 'lodash/noop';
import { connect } from 'react-redux';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Block from '../../Block';
import { Enum } from '../../../constants';
import { showModal } from '../../../store/actions';
import styles from './styles';

interface DateObject {
  day: number;
  dateString: string;
  month: number;
  timestamp: number;
  year: number;
}

interface IDatePickerProps {
  theme?: any;
  style?: any;
  current?: string;
  minDate?: string;
  maxDate?: string;
  monthFormat?: string;
  hideArrows?: boolean;
  disableMonthChange?: boolean;
  firstDay?: number; // If firstDay=1 week starts from Monday.
  hideDayNames?: boolean; // Hide day names. Default = false
  showWeekNumbers?: boolean; // Show week numbers to the left. Default = false
  onDayPress?: (date: DateObject) => void;
}

interface IProps {
  input: any;
  label: string;
  dispatch: any;
  datePickerProps: IDatePickerProps;
  onSubmitEditing?: (event: any) => void;
}

class ChooseDateField extends Component<IProps> {
  _onDateChanged = (data: DateObject) => {
    const newSelectedDate = moment(data.timestamp);
    const {
      input: { onChange },
    } = this.props;
    onChange(newSelectedDate);
  };

  _showChooseDateModal = () => {
    const value = get(this.props, 'input.value');
    const current = value ? moment(value) : moment();
    const currentDateStr = current.format('YYYY-MM-DD');
    const datePickerProps = {
      ...this.props.datePickerProps,
      current: currentDateStr,
      markedDates: {
        [currentDateStr]: { selected: true, marked: true },
      },
    };
    this.props.dispatch(
      showModal({
        ...datePickerProps,
        onModalPress: noop,
        onDateChanged: this._onDateChanged,
        modalType: Enum.ModalType.CHOOSE_DATE,
      }),
    );
  };

  render() {
    const {
      label,
      input: { value },
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this._showChooseDateModal}>
        <Block flex={false} style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.underlineTextContainer}>
            <Text style={styles.content}>{moment(value).format('MM/DD/YYYY')}</Text>
          </View>
        </Block>
      </TouchableWithoutFeedback>
    );
  }
}

export default connect()(ChooseDateField);
