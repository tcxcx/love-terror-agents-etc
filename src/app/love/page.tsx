'use client';

import { Suspense, useEffect, useState } from 'react';
import { EmptyState } from '@/components/love-page/empty-state';
import LovePage from '@/components/love-page';
import { LoveLink } from '@/components/love-page/link-params';
import { checkRoseClaimed, getRoseByPeanutLink } from '@/utils/supabase/queries';
import WalletNotConnected from '@/components/wallet-not-connected';
import ClaimLink from '@/components/peanut/claim/claim-link';
import { useAccount } from 'wagmi';
import ClaimAuthFlow from '@/components/claim-auth-flow';
import supabase from '@/utils/supabase/client';
import { Session } from '@supabase/supabase-js';

export default function Page() {
  const { peanutLink, isLoading, isValidLink, isClaimed } = LoveLink();
  const { address } = useAccount();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const renderContent = () => {
    if (!session) {
      return <ClaimAuthFlow />;
    }

    if (!peanutLink || !isValidLink || !isClaimed) {
      return (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <ClaimLink peanutLink={peanutLink as string} text="If you have a link, please claim it here." />
          </div>
        </>
      );
    }

    if (!isValidLink) {
      return <EmptyState />;
    }

    if (!isClaimed) {
      return (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <ClaimLink peanutLink={peanutLink as string} text="This link has not been claimed yet." />
          </div>
        </>
      );
    }

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LovePage peanutLink={peanutLink as string} />
      </Suspense>
    );
  };

  return (
    <div className='min-h-screen max-w-4xl mx-auto'>
      <div className="z-10">
        {renderContent()}
      </div>
    </div>
  );
}