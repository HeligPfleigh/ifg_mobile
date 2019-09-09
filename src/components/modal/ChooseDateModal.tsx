import React from 'react';
import moment from 'moment';
import { Calendar, CalendarList, CalendarBaseProps } from 'react-native-calendars';

interface IProps extends CalendarBaseProps {
  selectedDate?: any;
  onPress: () => void;
  scrollEnabled?: boolean;
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
    const { scrollEnabled, ...ownProps } = this.props;
    if (scrollEnabled) {
      return (
        <CalendarList
          firstDay={1}
          minDate={today}
          showScrollIndicator
          onDayPress={this._onDayPress}
          scrollEnabled={scrollEnabled}
          {...ownProps}
        />
      );
    }
    return <Calendar firstDay={1} minDate={today} onDayPress={this._onDayPress} {...ownProps} />;
  }
}

export default ChooseDateModal;
