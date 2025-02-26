import { injectable } from 'inversify';
import { Configuration, OpenAIApi } from 'openai';

@injectable()
export default class OpenAIService {
  private openAIService: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: `${process.env.OPENAI_API_KEY}`,
    });
    this.openAIService = new OpenAIApi(configuration);
  }

  // chatgpt
  private async createChatCompletion(prompt: string, maxTokens: number): Promise<string | null> {
    try {
      const response = await this.openAIService.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: maxTokens,
      });

      // TODO: レスポンスのバリデーション
      return response.data.choices[0].message?.content ?? null;
    } catch (error) {
      console.error('OpenAI:createChatCompletion: Error creating chat completion:', error);
      throw new Error('Chat completion failed');
    }
  }

  // カロリープロンプトを生成する関数
  private createCaloriePrompt(food: string): string {
    return `次の食べ物のカロリーを数字だけで答えてください: ${food}`;
  }

  // 食べないように諭すプロンプトを生成する関数
  private createAdvisePrompt(food: string): string {
    return `ユーザーが「${food}を食べたい」と言っています。ユーザーが食べないように諭してください。`;
  }

  //食べ物からカロリーを計算
  public async ConvertFoodToCalories(food: string): Promise<number | null> {
    const prompt = this.createCaloriePrompt(food);
    const calorieString = await this.createChatCompletion(prompt, 50);

    const calories = calorieString ? Number(calorieString) : null;

    return calories;
  }

  public async AdviseAgainstEating(food: string): Promise<string | null> {
    const prompt = this.createAdvisePrompt(food);

    return await this.createChatCompletion(prompt, 50);
  }
}
