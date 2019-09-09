import React from 'react';
import moment from 'moment';
import { Calendar, CalendarBaseProps } from 'react-native-calendars';

interface IProps extends CalendarBaseProps {
  selectedDate?: any;
  onPress: () => void;
  onDateChanged: (data: any) => void;
}

class ChooseDateModal extends React.Component<IProps> {
  _onDayPress = async (dateObj: any) => {
    await this.props.onDateChanged(dateObj);
    // toggle modal
    await this.props.onPress();
  };

  render() {
    const today = moment().format('YYYY-MM-DD');
    const { onPress, ...ownProps } = this.props;
    return <Calendar firstDay={1} minDate={today} onDayPress={this._onDayPress} {...ownProps} />;
  }
}

export default ChooseDateModal;
