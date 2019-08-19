import React, { Component, ReactNode } from 'react'
import { Text, TouchableOpacity, GestureResponderEvent, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { theme } from '../../../../constants';
import I18n from '../../../../core/i18n';
import { Block } from '../../../../components';
import { styles } from './styles';
import { WelcomeImg } from "../../../../assets/images";


interface SummarizeProps {
    onPress?: ((event: GestureResponderEvent) => void);
    score?: number;
}

export default class Summarize extends Component<SummarizeProps> {
    render() {
        const { onPress, score } = this.props;
        return (
            <Block style={styles.container}>
                <Block flex={1}>
                    <WelcomeImg width={60} height={40} />
                </Block>
                <Block flex={2}>
                    <Text style={styles.label}>{I18n.t('home.global_scores')}</Text>
                </Block>
                <Block row right flex={2}>
                    <Text style={styles.score}>{score}</Text>
                </Block>
                <Block flex={1} right row>
                    <TouchableOpacity style={styles.roundContainer} onPress={onPress}>
                        <MaterialCommunityIcons name='chevron-right' color={theme.colors.white} size={theme.sizes.base} style={styles.icon} />
                    </TouchableOpacity>
                </Block>
            </Block>
        )
    }
}
