'use client';

import { createContext } from 'react';
import { UserData } from 'app/services/UserService';

export const UserDataContext = createContext<UserData | null>(null);
export const DailyPatienceCaloriesContext = createContext<number>(0);
export const CommentContext = createContext<string>('');
