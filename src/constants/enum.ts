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

export { Tags, EvaluationType, Feeling, ImpactType };
