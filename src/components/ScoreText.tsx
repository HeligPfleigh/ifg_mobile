import React from 'react';
import { TextProps, Text } from 'react-native';

import { theme } from '../constants';

interface ScoreTextProps extends TextProps {
  score?: number;
}

const ScoreText: React.FC<ScoreTextProps> = ({ score = 0, style, ...rest }: ScoreTextProps) => {
  let defaultScoreStyle = { color: theme.colors.orange };
  if (score >= -5 && score <= 5) {
    defaultScoreStyle = { color: theme.scoreSpectrum[Math.floor(score) + 5] };
  }
  return (
    <Text style={[defaultScoreStyle, style]} {...rest}>
      {Math.round(score * 100) / 100}
    </Text>
  );
};

export default ScoreText;
