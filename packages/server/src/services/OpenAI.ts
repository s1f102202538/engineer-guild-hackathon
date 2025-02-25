import { injectable } from 'inversify';
import { Configuration, OpenAIApi } from 'openai';

@injectable()
export default class OpenAI {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async convertFoodToCalories(food: string): Promise<number> {
    try {
      const prompt = `次の食べ物のカロリーを数字だけで答えてください: ${food}`;
      const response = await this.openai.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 50,
      });
      const calorieString = response.data.choices[0].message?.content.trim();
      const calories = parseInt(calorieString, 10);
      if (isNaN(calories)) {
        throw new Error('カロリーの変換に失敗しました');
      }
      return calories;
    } catch (error) {
      console.error('Error converting food to calories:', error);
      return 0;
    }
  }

  async adviseAgainstEating(food: string): Promise<string> {
    try {
      const prompt = `ユーザーが「${food}を食べたい」と言っています。ユーザーが食べないように諭してください。`;
      const response = await this.openai.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 50,
      });
      return response.data.choices[0].message?.content.trim();
    } catch (error) {
      console.error('Error advising against eating:', error);
      return 'エラーが発生しました。もう一度試してください。';
    }
  }
}
