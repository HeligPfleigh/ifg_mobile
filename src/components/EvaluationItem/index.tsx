import React, { Component, ReactNode } from 'react'
import { Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from 'csstype';

import { theme } from '../../constants';
import { Block } from '..';
import { styles } from './styles';


interface EvaluationItemProps {
    colors: Color[];
    header?: string;
    headerColor?: Color;
    icon?: ReactNode;
    onPressText?: ((event: GestureResponderEvent) => void);
    onPressIcon?: ((event: GestureResponderEvent) => void);
    text?: string | number;
    textColor?: Color;
}

export default class EvaluationItem extends Component<EvaluationItemProps> {
    static defaultProps: EvaluationItemProps;

    render() {
        const {
            colors,
            header,
            headerColor,
            icon,
            onPressText,
            text,
            textColor,
            onPressIcon } = this.props;
        return (
            <Block flex={false} row style={styles.container}>
                {icon && <LinearGradient
                    colors={colors}
                    start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.0 }}
                    style={styles.roundContainer}
                >
                    <Block flex={false} style={styles.iconContainer}>
                        {icon}
                    </Block>
                </LinearGradient>}

                <Block flex={5} style={styles.textContainer}>
                    <Text style={[styles.header, { color: headerColor }]}>{header}</Text>
                    <TouchableOpacity onPress={onPressText}>
                        <Text style={[styles.detail, { color: textColor }]}>{text}</Text>
                    </TouchableOpacity>
                </Block>
                <Block flex={false}>
                    <TouchableOpacity onPress={onPressIcon}>
                        <MaterialCommunityIcons name='chevron-right' color={theme.colors.gray} size={theme.sizes.icon} />
                    </TouchableOpacity>
                </Block>
            </Block>
        )
    }
}

EvaluationItem.defaultProps = {
    colors: ['#00FFFF', '#8000FF'],
    headerColor: '#00FFFF',
    textColor: theme.colors.gray
}
