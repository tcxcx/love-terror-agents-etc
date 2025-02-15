'use client';

import { Suspense } from 'react';
import LovePage from '@/components/love-page';
import { LoadingOverview } from '@/components/loading-overview';
import { useSearchParams } from 'next/navigation';

export default function GamePage() {
  return (
    <Suspense fallback={<LoadingOverview />}>
      <GameContent />
    </Suspense>
  );
}

function GameContent() {
  const searchParams = useSearchParams();
  
  // Get the base URL
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://cringy-cupid.com.com';
  
  // Get hash if present
  if (typeof window === "undefined") return null;

  const hash = window.location.hash;
  
  // Create love URL with all parameters and hash
  const loveUrl = `${baseUrl}/love?${searchParams.toString()}${hash}`;
  
  console.log('Love URL:', loveUrl);

  if (!searchParams.toString()) {
    return <div>No parameters found</div>;
  }

  return <LovePage peanutLink={loveUrl} />;
}