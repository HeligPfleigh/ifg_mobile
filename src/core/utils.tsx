import React from 'react';

import {
  StormImg,
  SunImg,
  MoonImg,
  FeelGoodLv0,
  FeelGoodLv1,
  FeelGoodLv2,
  FeelGoodLv3,
  FeelGoodLv4,
} from '../assets/images';
import { theme, Enum } from '../constants';
import I18n from './i18n';

export const showWeatherIcon = (score: number) => {
  if (score < -2 && score >= -5) {
    return <StormImg />;
  }
  if (score > 2 && score <= 5) {
    return <SunImg />;
  }
  return <MoonImg />;
};

export const summaryDisplayProps = (type: Enum.EvaluationType) => {
  switch (type) {
    case Enum.EvaluationType.RELATIONSHIPS:
      return {
        title: I18n.t('summary.relationships'),
        gradients: theme.gradients.lightpink,
        iconGradients: theme.gradients.pink,
      };
    case Enum.EvaluationType.ACTIVITIES:
      return {
        title: I18n.t('summary.activities'),
        gradients: theme.gradients.lightblue,
        iconGradients: theme.gradients.blue,
      };
    case Enum.EvaluationType.INTAKES:
      return {
        title: I18n.t('summary.intakes'),
        gradients: theme.gradients.lightorange,
        iconGradients: theme.gradients.orange,
      };
    case Enum.EvaluationType.OTHER:
      return {
        title: I18n.t('summary.other'),
        gradients: theme.gradients.lightpurple,
        iconGradients: theme.gradients.purple,
      };
    case Enum.EvaluationType.OVERALL:
    default:
      return {
        title: I18n.t('summary.overall'),
        gradients: theme.gradients.lightindigo,
        iconGradients: theme.gradients.indigo,
      };
  }
};

export const summaryIcon = (score: number, size: number = 40) => {
  if (score < -3 && score >= -5) {
    return <FeelGoodLv0 width={size} height={size} />;
  }
  if (score < -1 && score >= -3) {
    return <FeelGoodLv1 width={size} height={size} />;
  }
  if (score < 1 && score >= -1) {
    return <FeelGoodLv2 width={size} height={size} />;
  }
  if (score < 3 && score >= 1) {
    return <FeelGoodLv3 width={size} height={size} />;
  }
  return <FeelGoodLv4 width={size} height={size} />;
};
