import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';

import { Block } from '../../../components';
import { Text, StyleSheet } from 'react-native';
import { theme } from '../../../constants';
import { showWeatherIcon, summaryDisplayProps } from '../../../core/utils';
import I18n from '../../../core/i18n';

interface SummaryHeaderProps {
    score: number;
    type: theme.EvaluationType;
}

export default class SummaryHeader extends Component<SummaryHeaderProps> {
    render() {
        const { score, type } = this.props;
        const { gradients, iconGradients, title } = summaryDisplayProps(type)
        return (
            <Block flex={false}>
                <LinearGradient
                    colors={gradients}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={styles.linearGradientContainer}
                >
                    <Block flex={2} row style={{ alignItems: 'center' }}>
                        <LinearGradient
                            colors={iconGradients}
                            start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.0 }}
                            style={styles.roundContainer}
                        >
                            <Block flex={false} style={styles.iconContainer}>
                                {showWeatherIcon(score)}
                            </Block>
                        </LinearGradient>
                        <Block flex={2} middle style={styles.summary}>
                            <Text>{title}</Text>
                            <Text style={styles.score}>{score}</Text>
                        </Block>
                    </Block>
                </LinearGradient>
                <Block flex={1} center middle>
                    <Text style={styles.legendTxt}>{I18n.t('summary.legends')}</Text>
                </Block>
                <Block flex={1} center middle>
                    <Text style={styles.descTxt}>{I18n.t('summary.detail_perceptions')}</Text>
                </Block>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    linearGradientContainer: {
        margin: theme.sizes.padding,
        marginBottom: theme.sizes.margin,
        borderRadius: theme.sizes.base,
        shadowColor: theme.colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    roundContainer: {
        height: 80,
        width: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        marginLeft: theme.sizes.margin,
    },
    iconContainer: {
        width: 72,
        height: 72,
        backgroundColor: theme.colors.white,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
    summary: {
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderColor: theme.colors.gray,
        margin: theme.sizes.margin,
        padding: theme.sizes.margin * 2,
    },
    score: {
        fontSize: theme.sizes.h1,
        fontWeight: "bold",
        color: theme.colors.green,
    },
    legendTxt: {
        color: theme.colors.secondary,
        fontSize: theme.sizes.caption,
    },
    descTxt: {
        marginTop: theme.sizes.margin,
        fontSize: theme.sizes.body,
        fontWeight: '700',
        color: theme.colors.black,
    }
})
