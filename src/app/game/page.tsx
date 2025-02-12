"use client";

import { Suspense, useState } from 'react';
import { EmptyState } from '@/components/love-page/empty-state';
import LovePage from '@/components/love-page';
import { LoveLink } from '@/components/love-page/link-params';
import { LoadingOverview } from '@/components/loading-overview';
import { useRouter } from 'next/navigation';

export default function Page() {
  
    const peanutLink = "https://peanut.fun/love?1234567890";

  // Show the love page for valid, claimed links
  return (
    <Suspense fallback={<LoadingOverview />}>
      <LovePage peanutLink={peanutLink as string} />
    </Suspense>
  );
}  