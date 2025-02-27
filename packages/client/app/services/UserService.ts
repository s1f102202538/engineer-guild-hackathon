import axios from 'axios';

import { UserClientIdRequest } from 'app/types/UserClientIdRequest';

export type UserData = {
  name: string;
  weight: number;
  weightGoal: number | null;
};

export default class UserService {
  private static readonly baseUrl = `${process.env.REACT_APP_API_URL}/user`;

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

  public static async CreateUserData(clientId: string, name: string, weight: number): Promise<void> {
    const url = `${this.baseUrl}/create`;
    const body = { clientId, name, weight } as UserClientIdRequest & { name: string; weight: number };
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
}
