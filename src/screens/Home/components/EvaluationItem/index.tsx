import React, { Component, ReactNode } from 'react'
import { Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from 'csstype';

import { theme } from '../../../../constants';
import I18n from '../../../../core/i18n';
import { Block } from '../../../../components';
import { styles } from './styles';


interface EvaluationItemProps {
    colors: Color[];
    header: string;
    headerColor?: Color;
    icon?: ReactNode;
    onPress?: ((event: GestureResponderEvent) => void);
}

export default class EvaluationItem extends Component<EvaluationItemProps> {
    static defaultProps: EvaluationItemProps;

    render() {
        const { colors, header, headerColor, icon, onPress } = this.props;
        return (
            <TouchableOpacity style={styles.container} onPress={onPress}>
                {icon && <LinearGradient
                    colors={colors}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={styles.roundContainer}
                >
                    <Block flex={false} style={styles.iconContainer}>
                        {icon}
                    </Block>
                </LinearGradient>}

                <Block flex={5} style={styles.textContainer}>
                    <Text style={[styles.header, { color: headerColor }]}>{header}</Text>
                    <Text style={styles.detail}>{I18n.t('home.view_details')}</Text>
                </Block>
                <Block flex={false}>
                    <MaterialCommunityIcons name='chevron-right' color={theme.colors.gray} size={theme.sizes.icon} />
                </Block>
            </TouchableOpacity>
        )
    }
}

EvaluationItem.defaultProps = {
    colors: ['#00FFFF', '#8000FF'],
    header: 'Header',
    headerColor: '#00FFFF',
}
