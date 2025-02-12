'use client';

import { Suspense } from 'react';
import LovePage from '@/components/love-page';
import { LoadingOverview } from '@/components/loading-overview';
import { useSearchParams } from 'next/navigation';

export default function GamePage() {
  const searchParams = useSearchParams();
  
  // Get all parameters
  const params = new URLSearchParams(searchParams);
  
  // Construct base URL
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
  
  // Create love URL with all parameters
  const loveUrl = `${baseUrl}/love?${params.toString()}`;
  
  console.log('Love URL:', loveUrl);

  return (
    <Suspense fallback={<LoadingOverview />}>
      <LovePage peanutLink={loveUrl} />
    </Suspense>
  );
}