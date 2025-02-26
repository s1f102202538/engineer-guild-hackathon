'use client';

import React, { ReactNode } from 'react';
import useCreateUser from '../hooks/useCreateUser';
import { useAuth } from '@clerk/nextjs';

interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider = ({ children }: ClientProviderProps) => {
  const { isSignedIn, userId } = useAuth();

  // ユーザーがサインインしている場合にのみユーザー作成処理を実行
  useCreateUser(isSignedIn ? userId : null);
  console.log('ClientProvider');
  return <>{children}</>;
};

export default ClientProvider;
