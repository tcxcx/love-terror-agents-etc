"use client";

import { Suspense } from 'react';
import { EmptyState } from '@/components/love-page/empty-state';
import LovePage from '@/components/love-page';
import { LoveLink } from '@/components/love-page/link-params';
import { checkRoseClaimed, getRoseByPeanutLink } from '@/utils/supabase/queries';
import ClaimLink from '@/components/peanut/claim/claim-link';
export default function Page() {
  const { peanutLink, isLoading, isValidLink, isClaimed } = LoveLink();

  console.log('peanutLink in love page', peanutLink);

  console.log('isLoading in love page', isLoading);
  console.log('isValidLink in love page', isValidLink);
  console.log('isClaimed in love page', isClaimed);

  const renderContent = () => {
    if (!peanutLink || !isValidLink || !isClaimed) {
      return (
        <>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <ClaimLink peanutLink={peanutLink as string} text="If you have a link, please claim it here." />
          </div>
        </>
      )
    }

    if (!isValidLink) {
      return <EmptyState />;
    }

    if (!isClaimed) {
       <>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <ClaimLink peanutLink={peanutLink as string} text="This link has not been claimed yet." />
        </div>
        </>
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