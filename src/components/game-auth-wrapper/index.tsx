"use client";
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import supabase from '@/utils/supabase/client';
import ClaimAuthFlow from '../claim-auth-flow';
import { useEffect, useState } from 'react';

interface GameAuthWrapperProps {
  children: React.ReactNode;
}

const GameAuthWrapper = ({ children }: GameAuthWrapperProps) => {
  const router = useRouter();
  const { address } = useAccount();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    getSession();
  }, []);

  const isAuthenticated = !!session && !!address;

  if (!isAuthenticated) {
    return <ClaimAuthFlow />;
  }

  return <>{children}</>;
};

export default GameAuthWrapper;