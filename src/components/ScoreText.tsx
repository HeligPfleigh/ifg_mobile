import React from 'react';
import { TextProps, Text } from 'react-native';

import { theme } from '../constants';

interface ScoreTextProps extends TextProps {
  score?: number;
}

const ScoreText: React.FC<ScoreTextProps> = ({ score = 0, style, ...rest }: ScoreTextProps) => {
  let defaultScoreStyle = { color: theme.colors.yellow };
  if (score >= -5 && score <= 5) {
    defaultScoreStyle = { color: theme.scoreSpectrum[Math.floor(score) + 5] };
  }
  return (
    <Text style={[defaultScoreStyle, style]} {...rest}>
      {score}
    </Text>
  );
};

export default ScoreText;