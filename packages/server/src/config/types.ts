const TYPES = {
  // ユーザー関連
  UserService: Symbol.for('UserService'),
  IUserService: Symbol.for('IUserService'),
  UserRepository: Symbol.for('UserRepository'),
  IUserRepository: Symbol.for('IUserRepository'),

  // 我慢カロリー関連
  DailyPatienceCalorieService: Symbol.for('DailyPatienceCalorieService'),
  IDailyPatienceCalorieService: Symbol.for('IDailyPatienceCalorieService'),
  DailyPatienceCalorieRepository: Symbol.for('DailyPatienceCalorieRepository'),
  IDailyPatienceCalorieRepository: Symbol.for('IDailyPatienceCalorieRepository'),

  // OpenAI関連
  OpenAIService: Symbol.for('OpenAIService'),
  IOpenAIService: Symbol.for('IOpenAIService'),
  OpenAIRepository: Symbol.for('OpenAIRepository'),
  IOpenAIRepository: Symbol.for('IOpenAIRepository'),
};

export { TYPES };
