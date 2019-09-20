import React from 'react';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';
import DatePicker from 'react-native-date-picker';
import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native';

import Block from '../../Block';
import BottomSheet from '../../BottomSheet';
import styles from './styles';

interface IDatePickerProps {
  date?: Date;
  locale?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  textColor?: string;
  fadeToColor?: string;
  timeZoneOffsetInMinutes?: number;
  mode?: 'date' | 'time' | 'datetime';
  minuteInterval?: 1 | 2 | 3 | 4 | 5 | 6 | 10 | 12 | 15 | 20 | 30;
}

interface IProps {
  input: any;
  label: string;
  datePickerProps: IDatePickerProps;
}

class DatePickerField extends React.Component<IProps> {
  bottomSheetRef: any;

  static defaultProps = {};

  onDateChanged = (data: any) => {
    const { input } = this.props;
    if (isFunction(input.onChange)) {
      input.onChange(moment(data));
    }
  };

  openBottomSheet = () => this.bottomSheetRef.open();

  closeBottomSheet = () => this.bottomSheetRef.close();

  setBottomSheetRef = (ref: any) => (this.bottomSheetRef = ref);

  render() {
    const {
      label,
      input: { value },
      datePickerProps,
    } = this.props;

    const heightPicker = isEqual(Platform.OS, 'ios') ? 260 : 220;

    return (
      <React.Fragment>
        <TouchableWithoutFeedback onPress={this.openBottomSheet}>
          <Block flex={false} style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.underlineTextContainer}>
              <Text style={styles.content}>{moment(value).format('MM/DD/YYYY')}</Text>
            </View>
          </Block>
        </TouchableWithoutFeedback>
        <BottomSheet height={heightPicker} ref={this.setBottomSheetRef}>
          <View style={styles.pickerContainer}>
            <DatePicker {...datePickerProps} date={moment(value).toDate()} onDateChange={this.onDateChanged} />
          </View>
        </BottomSheet>
      </React.Fragment>
    );
  }
}

export default DatePickerField;
