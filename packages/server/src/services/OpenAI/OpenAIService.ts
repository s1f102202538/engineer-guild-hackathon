import { inject, injectable } from 'inversify';
import { Configuration, OpenAIApi } from 'openai';
import IOpenAIService from './IOpenAIService';
import IOpenAIRepository from '../../repositories/OpenAIRepository/IOpenAIRepository';
import { TYPES } from '../../config/types';
import { ChatLog } from '@prisma/client';

@injectable()
export default class OpenAIService implements IOpenAIService {
  private openAIService: OpenAIApi;
  private openAIRepository: IOpenAIRepository;

  constructor(@inject(TYPES.IOpenAIRepository) openAIRepository: IOpenAIRepository) {
    const configuration = new Configuration({
      apiKey: `${process.env.OPENAI_API_KEY}`,
    });
    this.openAIService = new OpenAIApi(configuration);
    this.openAIRepository = openAIRepository;
  }

  // chatgpt
  private async createChatCompletion(prompt: string, maxTokens: number): Promise<string | null> {
    try {
      const response = await this.openAIService.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens,
      });

      return response.data.choices[0].message?.content ?? null;
    } catch (error) {
      console.error('OpenAI:createChatCompletion: Error creating chat completion:', error);
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
  private createAdvisePrompt(food: string): string {
    const prompt = `
    あなたは優秀な栄養士かつ心理学者です。
    以下の条件を踏まえた上で、${food}を食べないように諭してください。
    ・条件
      ・相手の気持ちに配慮すること
      ・長すぎる内容は避けること
      ・相手が理解しやすい言葉を使うこと

    以下に例を示します。
    ・例1
      ・入力: ハンバーガーがどうしても食べたいです。
      ・出力: ハンバーガーおいしいですよね。でも、今日はヘルシーなものを食べてみませんか？おすすめはサラダです！
    `;

    return prompt;
  }

  //食べ物からカロリーを計算
  public async ConvertFoodToCalories(food: string): Promise<number | null> {
    const prompt = this.createCaloriePrompt(food);
    // TODO: バリデーション
    const calorieString = await this.createChatCompletion(prompt, 50);

    const calories = calorieString ? Number(calorieString) : null;

    return calories;
  }

  public async AdviseAgainstEating(food: string): Promise<string> {
    const prompt = this.createAdvisePrompt(food);

    // TODO: バリデーション
    const response = await this.createChatCompletion(prompt, 50);
    if (response == null) {
      throw new Error('OpenAIService:AdviseAgainstEating: Failed to create chat completion');
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
