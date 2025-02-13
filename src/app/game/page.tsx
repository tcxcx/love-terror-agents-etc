'use client';

import { Suspense } from 'react';
import LovePage from '@/components/love-page';
import { LoadingOverview } from '@/components/loading-overview';
import { useSearchParams } from 'next/navigation';

export default function GamePage() {
  const searchParams = useSearchParams();
  
  // Get the base URL
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  
  // Get hash if present
  const hash = window.location.hash;
  
  // Create love URL with all parameters and hash
  const loveUrl = `${baseUrl}/love?${searchParams.toString()}${hash}`;
  
  console.log('Love URL:', loveUrl);

  if (!searchParams.toString()) {
    return <div>No parameters found</div>;
  }

  return (
    <Suspense fallback={<LoadingOverview />}>
      <LovePage peanutLink={loveUrl} />
    </Suspense>
  );
}