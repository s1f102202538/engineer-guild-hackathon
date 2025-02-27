import axios from 'axios';

import { UserClientIdRequest } from 'app/types/UserClientIdRequest';

export type UserData = {
  name: string;
  weight: number;
  weightGoal: number;
};

type GetTotalPatienceCaloriesResponse = {
  totalPatienceCalories: number;
};

export default class UserService {
  private static readonly baseUrl = `${process.env.NEXT_PUBLIC_API_ENDPOINT_URL}/user`;

  public static async GetUserData(clientId: string): Promise<UserData | null> {
    const url = `${this.baseUrl}/get`;
    const body = { clientId } as UserClientIdRequest;
    const response = await axios.post<UserData | null>(url, body);

    if (response.status !== 200) {
      throw new Error('UserService:getUserData: status is not 200');
    }
    const userData = response.data;

    return userData;
  }

  public static async CreateUserData(
    clientId: string,
    name: string,
    weight: number,
    weightGoal: number
  ): Promise<void> {
    const url = `${this.baseUrl}/create`;
    const body = { clientId, name, weight, weightGoal } as UserClientIdRequest & UserData;
    const response = await axios.post<void>(url, body);

    if (response.status !== 200) {
      throw new Error('UserService:CreateUserData: status is not 200');
    }
  }

  public static async UpdateWeightGoal(clientId: string, weightGoal: number): Promise<void> {
    const url = `${this.baseUrl}/update-weight-goal`;
    const body = { clientId, weightGoal } as UserClientIdRequest;
    const response = await axios.post<void>(url, body);

    if (response.status !== 200) {
      throw new Error('UserService:updateWeightGoal: status is not 200');
    }
  }

  public static async UpdateWeight(clientId: string, weight: number): Promise<void> {
    const url = `${this.baseUrl}/update-weight`;
    const body = { clientId, weight } as UserClientIdRequest;
    const response = await axios.post<void>(url, body);

    if (response.status !== 200) {
      throw new Error('UserService:updateWeight: status is not 200');
    }
  }

  public static async GetTotalPatienceCalories(clientId: string): Promise<number> {
    const url = `${this.baseUrl}/get-total-patience-calories`;
    const body = { clientId } as UserClientIdRequest;
    const response = await axios.post<GetTotalPatienceCaloriesResponse>(url, body);

    if (response.status !== 200) {
      throw new Error('UserService:getTotalPatienceCalories: status is not 200');
    }

    return response.data.totalPatienceCalories;
  }
}
