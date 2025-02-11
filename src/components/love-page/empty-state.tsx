import ClaimForm from "../peanut/claim/claim-info";
import { useRouter } from "next/navigation";

type EmptyStateProps = {
    type?: 'unclaimed' | 'claimed';
    peanutLink?: string;
  };
  
  export function EmptyState({ type, peanutLink }: EmptyStateProps) {
    if (type === 'unclaimed' && peanutLink) {
        //TO DO: adapt so claim form takes peanutLink as a prop
      return <ClaimForm />;
    }
  
    return (
      <div className="text-center">
        <p>No valentine found. Create one to get started!</p>
        <ClaimForm />
      
      </div>
    );
  }