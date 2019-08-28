enum EvaluationType {
  RELATIONSHIPS = 'relationships',
  ACTIVITIES = 'activities',
  INTAKES = 'intakes',
  OTHER = 'other',
  OVERALL = 'overall',
}

enum Tags {
  FAMILY = 'Family',
  LOVER = 'Lover/Partner',
  FRIENDS = 'Friends',
  WORK = 'Work',
  SOCIAL = 'Social',
  OTHER = 'Other',
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
}

export { Tags, EvaluationType, Feeling, ImpactType, ModalType };
