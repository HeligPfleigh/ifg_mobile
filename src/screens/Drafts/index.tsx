import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { connect } from 'react-redux';
import { Block } from '../../components';
import { theme, Enum } from '../../constants';
import I18n from '../../core/i18n';
import NavigatorMap from '../../navigations/NavigatorMap';
import { AppState, DraftsState } from '../../store/types';

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
  drafts: DraftsState;
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

class Drafts extends Component<DraftsProps> {
  _navigateToEvaluate = () => this.props.navigation.navigate(NavigatorMap.Evaluate);

  render() {
    const {
      drafts: { data: draftList },
    } = this.props;
    return (
      <ScrollView>
        {draftList.map(draft => (
          <Draft
            key={draft.id}
            type={draft.type}
            name={draft.name}
            label={draft.label}
            score={draft.score}
            desc={draft.desc}
            onPress={this._navigateToEvaluate}
          />
        ))}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  drafts: state.drafts,
});

export default connect(mapStateToProps)(Drafts);
