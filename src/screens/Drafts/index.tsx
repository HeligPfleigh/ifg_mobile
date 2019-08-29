import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Block } from '../../components';
import { theme, Enum } from '../../constants';
import I18n from '../../core/i18n';
import NavigatorMap from '../../navigations/NavigatorMap';

interface DraftProps {
  type: Enum.EvaluationType;
  name?: string;
  label?: Enum.Tags | null;
  desc?: string;
  score?: number;
  onPress?: (event: GestureResponderEvent) => void;
}

interface DraftsProps {
  navigation: NavigationScreenProp<NavigationState>;
}

const styles = StyleSheet.create({
  draftContainer: {
    backgroundColor: theme.colors.white,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: theme.sizes.margin,
  },
  draftGradient: {
    padding: theme.sizes.padding,
  },
  draftType: {
    fontSize: theme.sizes.h2,
    fontWeight: '600',
    marginBottom: theme.sizes.margin,
  },
  draftBody: {
    color: theme.colors.blue,
  },
});

const Draft: React.FC<DraftProps> = ({ type, name, label, desc, score, onPress }: DraftProps) => (
  <TouchableOpacity onPress={onPress}>
    <Block style={styles.draftContainer}>
      <LinearGradient
        colors={theme.gradients.lightpink}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 0.0 }}
        style={styles.draftGradient}
      >
        <Text style={styles.draftType}>{I18n.t(`home.${type}`)}</Text>
        <Text style={styles.draftBody}>{name}</Text>
        <Text style={styles.draftBody}>{label}</Text>
        <Text style={styles.draftBody}>{desc}</Text>
        <Text style={styles.draftBody}>{score}</Text>
      </LinearGradient>
    </Block>
  </TouchableOpacity>
);

export default class Drafts extends Component<DraftsProps> {
  _navigateToEvaluate = () => this.props.navigation.navigate(NavigatorMap.Evaluate);

  render() {
    return (
      <ScrollView>
        <Draft
          type={Enum.EvaluationType.RELATIONSHIPS}
          name="Sara"
          label={Enum.Tags.FRIENDS}
          onPress={this._navigateToEvaluate}
        />
      </ScrollView>
    );
  }
}
