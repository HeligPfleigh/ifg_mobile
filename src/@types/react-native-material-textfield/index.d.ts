// Type definitions for react-native-material-textfield 0.12
// Project: https://github.com/n4kz/react-native-material-textfield
// Custom by: Linh Le <https://github.com/mtt-linh>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.6.2

declare module 'react-native-material-textfield' {
  import * as React from 'react';
  import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

  export interface TextFieldProps extends TextInputProps {
    animationDuration?: number;

    /* Disable autogrow */
    height?: number;

    /* add component support bordered */
    bordered?: boolean;

    fontSize?: number;
    titleFontSize?: number;
    labelFontSize?: number;
    labelHeight?: number;
    labelPadding?: number;
    inputContainerPadding?: number;

    style?: StyleProp<TextStyle>;
    labelTextStyle?: StyleProp<TextStyle>;
    titleTextStyle?: StyleProp<TextStyle>;
    affixTextStyle?: StyleProp<TextStyle>;

    tintColor?: string;
    textColor?: string;
    baseColor?: string;

    label?: string;
    title?: string;

    characterRestriction?: number;

    error?: string;
    errorColor?: string;

    lineWidth?: number;
    activeLineWidth?: number;

    disabled?: boolean;

    disabledLineWidth?: number;

    renderAccessory?(): JSX.Element;

    clearTextOnFocus?: boolean;

    prefix?: string;
    suffix?: string;

    containerStyle?: StyleProp<ViewStyle>;
    inputContainerStyle?: StyleProp<ViewStyle>;

    onPress?(event: Event): void;
    onChangeText?(text: string): void;
  }

  /**
   * Material Style Text Field
   * @see https://github.com/n4kz/react-native-material-textfield/blob/master/src/components/field/index.js
   */
  export class TextField extends React.Component<TextFieldProps, any> {
    /*
     * Acquire focus
     */
    focus(): void;

    /*
     * Release focus
     */
    blur(): void;

    /*
     * Clear text field
     */
    clear(): void;

    /*
     * Get current value
     */
    value(): string;

    /*
     * Get current focus state
     */
    isFocused(): boolean;

    /*
     * Get current restriction state
     */
    isRestricted(): boolean;
  }
}
