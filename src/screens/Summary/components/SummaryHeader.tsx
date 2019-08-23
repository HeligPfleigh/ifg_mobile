import React, { Component } from 'react'
import { Block } from '../../../components';
import { SunImg } from '../../../assets/images';
import { Text, StyleSheet } from 'react-native';
import { theme } from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';

export default class SummaryHeader extends Component {
    render() {
        return (
            <Block flex={false}>
                <LinearGradient
                    colors={['#00FFFF', '#8000FF']}
                    start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                    style={styles.linearGradientContainer}
                >
                    <Block flex={2} row style={{ alignItems: 'center' }}>
                        <LinearGradient
                            colors={['#00FFFF', '#8000FF']}
                            start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.0 }}
                            style={styles.roundContainer}
                        >
                            <Block flex={false} style={styles.iconContainer}>
                                <SunImg />
                            </Block>
                        </LinearGradient>
                        <Block flex={2} middle style={styles.summary}>
                            <Text>Relationships</Text>
                            <Text style={styles.score}>4.5</Text>
                        </Block>
                    </Block>
                </LinearGradient>
                <Block flex={1} center middle>
                    <Text style={styles.legendTxt}>Legends</Text>
                </Block>
                <Block flex={1} center middle>
                    <Text style={styles.descTxt}>Details of your perceptions</Text>
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
