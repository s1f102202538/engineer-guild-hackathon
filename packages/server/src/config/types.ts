const TYPES = {
  UserService: Symbol.for('UserService'),
  IUserService: Symbol.for('IUserService'),
  UserRepository: Symbol.for('UserRepository'),
  IUserRepository: Symbol.for('IUserRepository'),
  DailyPatienceCalorieService: Symbol.for('DailyPatienceCalorieService'),
  IDailyPatienceCalorieService: Symbol.for('DailyPatienceCalorieService'),
  DailyPatienceCalorieRepository: Symbol.for('DailyPatienceCalorieRepository'),
  DailyPatienceCalorieController: Symbol.for('DailyPatienceCalorieController'),
  IDailyPatienceCalorieRepository: Symbol.for('IDailyPatienceCalorieRepository'),
  OpenAIService: Symbol.for('OpenAIService'),
  IOpenAIService: Symbol.for('IOpenAIService'),
  OpenAIRepository: Symbol.for('OpenAIRepository'),
  IOpenAIRepository: Symbol.for('IOpenAIRepository'),
};

export { TYPES };
