import ClaimLink from "../peanut/claim/claim-link";

type EmptyStateProps = {
  peanutLink?: string;
};

export function EmptyState({ peanutLink }: EmptyStateProps) {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ClaimLink peanutLink={peanutLink as string} text="If you have a link, please claim it here." />
    </div>
  )
}
