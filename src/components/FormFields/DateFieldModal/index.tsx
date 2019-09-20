import React, { Component } from 'react';
import moment from 'moment';
import get from 'lodash/get';
import extend from 'lodash/extend';
import omit from 'lodash/omit';
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
  dateRange?: number; // total years will display on calendar
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

class DateFieldModal extends Component<IProps> {
  _onDateChanged = (data: DateObject) => {
    const newSelectedDate = moment(data.timestamp);
    const {
      input: { onChange },
    } = this.props;
    onChange(newSelectedDate);
  };

  _showChooseDateModal = () => {
    const today = moment();
    const value = get(this.props, 'input.value');
    const current = value ? moment(value) : today;
    const currentDateStr = current.format('YYYY-MM-DD');
    const dateRange = get(this.props, 'datePickerProps.dateRange', undefined);
    let ownPickerProps = omit(get(this.props, 'datePickerProps', {}), ['dateRange']);
    const maxDateStr = get(ownPickerProps, 'maxDate', undefined);
    if (dateRange && maxDateStr) {
      const maxDate = moment(maxDateStr, 'YYYY-MM-DD');
      // calc futureScrollRange & pastScrollRange
      const num = maxDate.diff(current, 'months');
      const futureScrollRange = num >= 0 ? num : 0;
      const expectMonths = dateRange * 12;
      const minDate = maxDate.subtract(expectMonths > futureScrollRange ? expectMonths : futureScrollRange, 'months');
      const minDateStr = minDate.format('YYYY-MM-DD');
      const pastScrollRange = current.diff(minDate, 'months') + 1;
      ownPickerProps = extend(ownPickerProps, { minDate: minDateStr, futureScrollRange, pastScrollRange });
    }
    const datePickerProps = {
      ...ownPickerProps,
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

export default connect()(DateFieldModal);
