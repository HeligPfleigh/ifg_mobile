import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Rocket, BrainStorm, Folder, Congratulation, Finger, WelcomeImg } from '../../assets/images';
import I18n from '../../core/i18n';
import { theme } from '../../constants';
import Block from '../Block';

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
    marginBottom: theme.sizes.margin,
    fontSize: theme.sizes.font,
  },
  smartCharacter: {
    color: theme.colors.blue,
    fontWeight: 'bold',
  },
  licenseContainer: {
    backgroundColor: theme.colors.white,
    padding: theme.sizes.margin,
    borderRadius: theme.sizes.radius,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  licenseBody: {
    marginTop: theme.sizes.margin,
    marginBottom: theme.sizes.padding,
  },
  licenseDescription: {
    marginTop: theme.sizes.margin,
    marginBottom: theme.sizes.margin,
  },
  licenseTitle: {
    fontWeight: '700',
    fontSize: theme.sizes.h3,
    marginTop: theme.sizes.padding,
  },
  decorateBtn: {
    height: 30,
    width: 80,
    borderRadius: 20,
    borderColor: theme.colors.blue,
    borderWidth: StyleSheet.hairlineWidth,
  },
  decorateTxt: {
    color: theme.colors.blue,
    marginLeft: theme.sizes.margin / 2,
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

const DecorationBtn = () => (
  <Block style={styles.decorateBtn} flex={false} center middle row>
    <MaterialCommunityIcons size={20} name="check" color={theme.colors.blue} />
    <Text style={styles.decorateTxt}>OK</Text>
  </Block>
);

export const DraftSavedModal: React.FC<NoticeModalProps> = ({ onPress }: NoticeModalProps) => {
  return (
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <Folder />
      <Text style={[styles.headerTitle, styles.text]}>{I18n.t('modal.draft_saved.header')}</Text>
      <Text style={[styles.contentTitle, styles.text]}>{I18n.t('modal.draft_saved.body')}</Text>
      <DecorationBtn />
    </TouchableOpacity>
  );
};

export const EvaluationSavedModal: React.FC<NoticeModalProps> = ({ onPress }: NoticeModalProps) => {
  return (
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <BrainStorm />
      <Text style={[styles.headerTitle, styles.text]}>{I18n.t('modal.evaluation_saved.header')}</Text>
      <Text style={[styles.contentTitle, styles.text]}>{I18n.t('modal.evaluation_saved.body')}</Text>
      <DecorationBtn />
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

export const SMARTModal: React.FC<NoticeModalProps> = ({ onPress }: NoticeModalProps) => (
  <TouchableOpacity style={styles.smartContainer} onPress={onPress}>
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

export const FeatureNotAvailableModal: React.FC<NoticeModalProps> = ({ onPress }: NoticeModalProps) => {
  return (
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <WelcomeImg />
      <Text style={[styles.headerTitle, styles.text]}>{I18n.t('modal.feature_not_available.header')}</Text>
    </TouchableOpacity>
  );
};

export const NetworkNotAvailableModal: React.FC<NoticeModalProps> = ({ onPress }: NoticeModalProps) => {
  return (
    <TouchableOpacity style={styles.content} onPress={onPress}>
      <WelcomeImg />
      <Text style={[styles.headerTitle, styles.text]}>{I18n.t('modal.network_not_available.header')}</Text>
    </TouchableOpacity>
  );
};

export const LicenseModal: React.FC<NoticeModalProps> = ({ onPress }: NoticeModalProps) => {
  return (
    <SafeAreaView>
      <ScrollView style={styles.licenseContainer}>
        <TouchableOpacity style={styles.licenseBody} onPress={onPress}>
          <Text style={[styles.headerTitle, styles.text]}>{I18n.t('modal.license.title')}</Text>
          <Text style={[styles.licenseDescription]}>{I18n.t('modal.license.description')}</Text>
          <Text style={styles.licenseTitle}>{I18n.t('modal.license.body.accounts_and_membership.title')}</Text>
          <Text style={[styles.licenseDescription]}>
            {I18n.t('modal.license.body.accounts_and_membership.description')}
          </Text>
          <Text style={styles.licenseTitle}>{I18n.t('modal.license.body.user_content.title')}</Text>
          <Text style={[styles.licenseDescription]}>{I18n.t('modal.license.body.user_content.description')}</Text>
          <Text style={styles.licenseTitle}>{I18n.t('modal.license.body.backups.title')}</Text>
          <Text style={[styles.licenseDescription]}>{I18n.t('modal.license.body.backups.description')}</Text>
          <Text style={styles.licenseTitle}>{I18n.t('modal.license.body.link.title')}</Text>
          <Text style={[styles.licenseDescription]}>{I18n.t('modal.license.body.link.description')}</Text>
          <Text style={styles.licenseTitle}>{I18n.t('modal.license.body.changes.title')}</Text>
          <Text style={[styles.licenseDescription]}>{I18n.t('modal.license.body.changes.description')}</Text>
          <Text style={styles.licenseTitle}>{I18n.t('modal.license.body.acceptance.title')}</Text>
          <Text style={[styles.licenseDescription]}>{I18n.t('modal.license.body.acceptance.description')}</Text>
          <Text style={styles.licenseTitle}>{I18n.t('modal.license.body.contact.title')}</Text>
          <Text style={[styles.licenseDescription]}>{I18n.t('modal.license.body.contact.description')}</Text>
          <Text>{I18n.t('modal.license.end')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
