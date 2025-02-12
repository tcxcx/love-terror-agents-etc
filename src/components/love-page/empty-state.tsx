import ClaimLink from "../peanut/claim/claim-link";
import Claim from "../peanut/claim/claim";
import { useRouter } from "next/navigation";
import ValentineChat from "../valentine-chat";
import LovePage from '@/components/love-page';
import { Suspense } from "react";


type EmptyStateProps = {
    type?: 'unclaimed' | 'claimed' | 'no-link';
    peanutLink?: string;
  };
  
  export function EmptyState({ type, peanutLink }: EmptyStateProps) {
    if (type === 'unclaimed' && peanutLink) {
      <p> This link has not been claimed yet.</p>
      return <ClaimLink peanutLink={peanutLink} />;
    }


    if (type === 'unclaimed' || !peanutLink) {
      <p> This link has not been claimed yet.</p>
      return <Claim />;
    }

    if (type === 'claimed' && peanutLink) {
      <p> This link has not been claimed yet.</p>
      return 
      <Suspense fallback={<div>Loading...</div>}>
        <LovePage peanutLink={peanutLink as string} />
      </Suspense>
    ;
    }

     return <div>Loading...</div>;
  }