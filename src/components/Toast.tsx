import Toast from 'react-native-root-toast';
import { theme } from '../constants';

const success = (message: string) =>
  Toast.show(message, {
    shadow: false,
    animation: true,
    backgroundColor: theme.colors.green,
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
  });

const error = (message: string) =>
  Toast.show(message, {
    shadow: false,
    animation: true,
    backgroundColor: theme.colors.red,
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
  });

export default {
  success,
  error,
};
