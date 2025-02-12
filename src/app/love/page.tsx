"use client";

import { Suspense } from 'react';
import { EmptyState } from '@/components/love-page/empty-state';
import LovePage from '@/components/love-page';
import { LoveLink } from '@/components/love-page/link-params';
import { checkRoseClaimed, getRoseByPeanutLink } from '@/utils/supabase/queries';

export default function Page() {
  const { peanutLink, isLoading, isValidLink, isClaimed } = LoveLink();

  // Show empty state when no link is present
  if (!peanutLink) {
    return <EmptyState type="no-link" />;
  }

  // Show empty state for invalid or non-existent links
  if (!isValidLink) {
    return <EmptyState />;
  }

  // Show empty state for unclaimed links
  if (!isClaimed) {
    return <EmptyState type="unclaimed" peanutLink={peanutLink as string} />;
  }

  // Show the love page for valid, claimed links
  if (isClaimed) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LovePage peanutLink={peanutLink as string} />
      </Suspense>
    );
  }
}