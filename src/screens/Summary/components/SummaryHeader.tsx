import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigation, NavigationInjectedProps } from 'react-navigation';

import { Text, StyleSheet } from 'react-native';
import { Block, Button, ScoreText } from '../../../components';
import { theme, Enum } from '../../../constants';
import { showWeatherIcon, summaryDisplayProps } from '../../../core/utils';
import I18n from '../../../core/i18n';
import NavigatorMap from '../../../navigations/NavigatorMap';

const styles = StyleSheet.create({
  linearGradientContainer: {
    backgroundColor: theme.colors.white,
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
  title: {
    fontSize: theme.sizes.h2,
    marginBottom: theme.sizes.margin / 2,
  },
  score: {
    fontSize: theme.sizes.h1,
    fontWeight: 'bold',
  },
  legendTxt: {
    color: theme.colors.primary,
    fontSize: theme.sizes.header,
    textDecorationLine: 'underline',
  },
  descTxt: {
    marginTop: theme.sizes.margin,
    fontSize: theme.sizes.body,
    fontWeight: '700',
    color: theme.colors.black,
  },
});

interface SummaryHeaderProps extends NavigationInjectedProps {
  score: number;
  type: Enum.EvaluationType;
}

const SummaryHeader: React.FC<SummaryHeaderProps> = ({ navigation, score, type }: SummaryHeaderProps) => {
  const { gradients, iconGradients, title } = summaryDisplayProps(type);
  const navigateToLegend = () => navigation.navigate(NavigatorMap.Legend);
  return (
    <Block flex={false}>
      <LinearGradient
        colors={gradients}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.linearGradientContainer}
      >
        <Block flex={2} row style={{ alignItems: 'center' }}>
          <LinearGradient
            colors={iconGradients}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
            style={styles.roundContainer}
          >
            <Block flex={false} style={styles.iconContainer}>
              {showWeatherIcon(score)}
            </Block>
          </LinearGradient>
          <Block flex={2} middle style={styles.summary}>
            <Text style={styles.title}>{title}</Text>
            <ScoreText score={score} style={styles.score} />
          </Block>
        </Block>
      </LinearGradient>
      <Block flex={1} center middle>
        <Button onPress={navigateToLegend} hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }}>
          <Text style={styles.legendTxt}>{I18n.t('summary.legends')}</Text>
        </Button>
      </Block>
      <Block flex={1} center middle>
        <Text style={styles.descTxt}>{I18n.t('summary.detail_perceptions')}</Text>
      </Block>
    </Block>
  );
};

export default withNavigation(SummaryHeader);
