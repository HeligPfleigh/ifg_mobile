import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Rocket, BrainStorm, Folder, Congratulation, Finger } from '../../assets/images';
import I18n from '../../core/i18n';
import { theme } from '../../constants';

const styles = StyleSheet.create({
  content: {
    backgroundColor: theme.colors.white,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.sizes.radius,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  text: {
    marginVertical: theme.sizes.margin,
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: theme.sizes.h2,
    fontWeight: '700',
  },
  contentTitle: {
    fontSize: theme.sizes.font,
  },
  smartContainer: {
    backgroundColor: theme.colors.white,
    padding: 22,
    borderRadius: theme.sizes.radius,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  smartHeader: {
    fontSize: theme.sizes.h2,
  },
  smartBody: {
    marginTop: theme.sizes.margin,
    marginBottom: theme.sizes.padding,
    fontSize: theme.sizes.font,
  },
  smartCharacter: {
    color: theme.colors.blue,
    fontWeight: 'bold',
  },
});

interface NoticeModalProps {
  onPress: () => void;
}

interface IEmphasizeFirstCharacterText {
  text: string;
}

export const DefaultModal: React.FC<NoticeModalProps> = ({ onPress }: NoticeModalProps) => (
  <TouchableOpacity style={styles.content} onPress={onPress} />
);

export const SelfEvaluationModal: React.FC<NoticeModalProps> = ({ onPress }: NoticeModalProps) => {
  return (
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <Rocket />
      <Text style={[styles.headerTitle, styles.text]}>{I18n.t('modal.self_evaluation.header')}</Text>
    </TouchableOpacity>
  );
};

export const DraftSavedModal: React.FC<NoticeModalProps> = ({ onPress }: NoticeModalProps) => {
  return (
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <Folder />
      <Text style={[styles.headerTitle, styles.text]}>{I18n.t('modal.draft_saved.header')}</Text>
      <Text style={[styles.contentTitle, styles.text]}>{I18n.t('modal.draft_saved.body')}</Text>
    </TouchableOpacity>
  );
};

export const EvaluationSavedModal: React.FC<NoticeModalProps> = ({ onPress }: NoticeModalProps) => {
  return (
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <BrainStorm />
      <Text style={[styles.headerTitle, styles.text]}>{I18n.t('modal.evaluation_saved.header')}</Text>
      <Text style={[styles.contentTitle, styles.text]}>{I18n.t('modal.evaluation_saved.body')}</Text>
    </TouchableOpacity>
  );
};

export const SignUpSuccessModal: React.FC<NoticeModalProps> = ({ onPress }: NoticeModalProps) => {
  return (
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <Congratulation />
      <Text style={[styles.headerTitle, styles.text]}>{I18n.t('modal.signup_success.header')}</Text>
      <Text style={[styles.contentTitle, styles.text]}>{I18n.t('modal.signup_success.body')}</Text>
    </TouchableOpacity>
  );
};

export const DeleteAccountModal: React.FC<NoticeModalProps> = ({ onPress }: NoticeModalProps) => {
  return (
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <Finger />
      <Text style={[styles.contentTitle, styles.text]}>{I18n.t('modal.delete_account.body')}</Text>
    </TouchableOpacity>
  );
};

const EmphasizeFirstCharacterText = ({ text }: IEmphasizeFirstCharacterText) => {
  const [firstCharacter, ...rest] = text;
  return (
    <Text style={styles.smartHeader}>
      <Text style={styles.smartCharacter}>{firstCharacter}</Text>
      {rest.join('')}
    </Text>
  );
};

export const SMARTModal: React.FC<NoticeModalProps> = () => (
  <TouchableOpacity style={styles.smartContainer}>
    <EmphasizeFirstCharacterText text={I18n.t('modal.smart.specific.header')} />
    <Text style={styles.smartBody}>{I18n.t('modal.smart.specific.body')}</Text>
    <EmphasizeFirstCharacterText text={I18n.t('modal.smart.measurable.header')} />
    <Text style={styles.smartBody}>{I18n.t('modal.smart.measurable.body')}</Text>
    <EmphasizeFirstCharacterText text={I18n.t('modal.smart.achievable.header')} />
    <Text style={styles.smartBody}>{I18n.t('modal.smart.achievable.body')}</Text>
    <EmphasizeFirstCharacterText text={I18n.t('modal.smart.relevant.header')} />
    <Text style={styles.smartBody}>{I18n.t('modal.smart.relevant.body')}</Text>
    <EmphasizeFirstCharacterText text={I18n.t('modal.smart.time_based.header')} />
    <Text style={styles.smartBody}>{I18n.t('modal.smart.time_based.body')}</Text>
    <Text style={[styles.smartHeader, styles.text]}>{I18n.t('modal.smart.footer')}</Text>
  </TouchableOpacity>
);
