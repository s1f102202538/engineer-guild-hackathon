import { inject, injectable } from 'inversify';
import { Configuration, OpenAIApi } from 'openai';
import IOpenAIService from './IOpenAIService';
import IOpenAIRepository from '../../repositories/OpenAI/IOpenAIRepository';
import { TYPES } from '../../config/types';
import { ChatLog } from '@prisma/client';
import logger from '../../config/logger';
import extractNumbers from '../../utils/extractnumbers';

@injectable()
export default class OpenAIService implements IOpenAIService {
  private openAIService: OpenAIApi;
  private openAIRepository: IOpenAIRepository;

  private readonly MAX_TOKENS = 200;

  constructor(@inject(TYPES.IOpenAIRepository) openAIRepository: IOpenAIRepository) {
    const configuration = new Configuration({
      basePath: `${process.env.OPENAI_BASE_URL}`,
      apiKey: `${process.env.OPENAI_API_KEY}`,
    });
    this.openAIService = new OpenAIApi(configuration);
    this.openAIRepository = openAIRepository;
  }

  // chatgpt
  private async createChatCompletion(prompt: string): Promise<string | null> {
    try {
      const response = await this.openAIService.createChatCompletion({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: this.MAX_TOKENS,
      });

      return response.data.choices[0].message?.content ?? null;
    } catch (error) {
      logger.error('OpenAIService:createChatCompletion: Error creating chat completion:', error);
      throw new Error('Chat completion failed');
    }
  }

  // カロリープロンプトを生成する関数
  private createCaloriePrompt(food: string): string {
    const prompt = `
    あなたは優秀な栄養士です。
    以下の条件を踏まえた上で、${food}のカロリーを教えてください。
    ・条件
      ・回答は数値のみであること
      ・単位はkcalであること
      ・1人が摂取するカロリー量であること
      ・人間が摂取可能な範囲内であること

    以下に例をしまします。
    ・例1
      ・入力: ごはん
      ・出力: 168
    `;

    return prompt;
  }

  // 食べないように諭すプロンプトを生成する関数
  private createAdvisePrompt(message: string, chatLogs: ChatLog[]): string {
    const context = chatLogs.map((log) => (log.isAI ? `AI: ${log.message}` : `User: ${log.message}`)).join('\n');
    const prompt = `
      あなたは優秀な栄養士かつ心理学者です。
      以下の条件を踏まえた上で、ユーザーが${message}に含まれるジャンキーな食べ物を食べないように諭してください。
      ・条件
        ・相手の気持ちに配慮すること
        ・長すぎる内容は避けること
        ・相手が理解しやすい言葉を使うこと

      以下に例を示します。
      ・例1
        ・入力: ハンバーガーがどうしても食べたいです。
        ・出力: ハンバーガーおいしいですよね。でも、今日はヘルシーなものを食べてみませんか？おすすめはサラダです！

      以下は過去の会話の履歴です。
      ${context}

      今回のユーザーの入力: ${message}
    `;

    return prompt;
  }

  //カロリーを我慢したことを褒めるプロンプトを生成する関数
  private createPraisePrompt(calories: number): string {
    const prompt = `
      あなたは優秀な栄養士かつ心理学者です。
      以下の条件を踏まえた上で、ユーザーが過去にカロリーを我慢できたことを褒めてください。
      ・条件
        ・相手の気持ちに配慮すること
        ・長すぎる内容は避けること
        ・相手が理解しやすい言葉を使うこと

      以下に例を示します。
      ・例1
        ・入力: 500
        ・出力: 500kcal我慢できたなんて、本当に頑張りましたね！

      ユーザーから入力されたカロリー数に応じて、リアクションも変えてください。
      ・例1
        ・入力: 2000
        ・出力: 素晴らしいですね！！2000kcal我慢できたなんて信じられません！
      ・例2
        ・入力: 100
        ・出力: よく頑張りましたね！積み重ねていきましょう！


      今回のユーザーの入力: ${calories}kcal
    `;

    return prompt;
  }

  //食べ物からカロリーを計算
  public async ConvertFoodToCalories(food: string): Promise<number | null> {
    const prompt = this.createCaloriePrompt(food);
    const answer = await this.createChatCompletion(prompt);

    if (answer == null) return null;

    // 回答から数値のみを取り出す
    const calories = Number(extractNumbers(answer));

    // calorieStringが数値の文字列かどうかを判定
    if (isNaN(extractNumbers(answer as string))) return null;

    return calories;
  }

  // 食べないように諭す
  public async AdviseAgainstEating(userId: string, message: string): Promise<string> {
    const chatLogs = await this.GetChatLog(userId, 20); // 直近20件のログを取得

    const prompt = this.createAdvisePrompt(message, chatLogs);

    // TODO: バリデーション
    const response = await this.createChatCompletion(prompt);
    if (response == null) {
      throw new Error('OpenAIService:AdviseAgainstEating: Failed to create chat completion');
    }

    return response;
  }

  // カロリーを我慢したことを褒める
  public async PraiseCaloriePatience(calories: number): Promise<string> {
    const prompt = this.createPraisePrompt(calories);

    const response = await this.createChatCompletion(prompt);

    if (response == null) {
      throw new Error('OpenAIService:PraiseCaloriePatience: Failed to create chat completion');
    }

    return response;
  }

  public async SaveChatLog(userId: string, message: string, isAI: boolean): Promise<void> {
    await this.openAIRepository.CreateChatLog(userId, message, isAI);
  }

  public async GetChatLog(userId: string, maxTakes: number = 50): Promise<ChatLog[]> {
    return await this.openAIRepository.GetChatLog(userId, maxTakes);
  }
}
