enum EvaluationType {
  RELATIONSHIPS = 'relationships',
  ACTIVITIES = 'activities',
  INTAKES = 'intakes',
  OTHER = 'other',
  OVERALL = 'overall',
}

enum Feeling {
  GOOD = 'good',
  BAD = 'bad',
}

enum ImpactType {
  ENERGY = 'energy',
  MOOD = 'mood',
}

enum ModalType {
  DEFAULT = 'default',
  SELF_EVALUATION = 'self_evaluation',
  DRAFT_SAVED = 'draft_saved',
  EVALUATION_SAVED = 'evaluation_saved',
  SIGNUP_SUCCESS = 'signup_success',
  DELETE_ACCOUNT = 'delete_account',
  SMART = 'smart',
  FEATURE_NOT_AVAILABLE = 'feature_not_available',
  CHOOSE_DATE = 'choose_date',
  LICENSE = 'license',
  NETWORK_NOT_AVAILABLE = 'network_not_available',
}

enum NavigationParamsName {
  EVALUATION_TYPE = 'evaluationType',
  EVALUATION_DATA = 'evaluation_data',
  RESET_PASSWORD_TOKEN = 'reset_password_token',
}

enum ReduxFormName {
  SIGN_IN = 'signin',
  SIGN_UP = 'signup',
  FORGOT_PASSWORD = 'forgot-password',
  UPDATE_INFO = 'update-user-info',
  CHANGE_PASSWORD = 'change-password',
  CHANGE_EMAIL = 'change-user-email',
  RESET_PASSWORD = 'reset-password',
}

const tags: any = {
  [EvaluationType.RELATIONSHIPS]: ['family', 'lover', 'friends', 'work', 'social', 'other_figures'],
  [EvaluationType.ACTIVITIES]: ['hobbies', 'job', 'fitness', 'spirituality', 'projects', 'other_activities'],
  [EvaluationType.INTAKES]: ['supplements', 'drinks', 'medications', 'foods', 'other_intakes'],
  [EvaluationType.OTHER]: ['routines', 'places', 'objects', 'memories', 'dreams', 'animals', 'other_elements'],
};

enum ActionStatus {
  ONGOING = 'ongoing',
  ARCHIEVED = 'archieved',
}

const SUFFIX = 'ifeelgood://';

export {
  ActionStatus,
  EvaluationType,
  Feeling,
  ImpactType,
  ModalType,
  NavigationParamsName,
  ReduxFormName,
  tags,
  SUFFIX,
};
