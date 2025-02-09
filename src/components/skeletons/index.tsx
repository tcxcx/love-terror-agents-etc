import { Skeleton } from "@/components/ui/skeleton";

export const ActionBannerSkeleton: React.FC = () => {
    return (
      <Skeleton className="w-full h-10 mb-2 animate-pulse bg-gradient-to-bl from-purple-400 to-teal-400 dark:from-indigo-900 dark:via-purple-900 dark:to-cyan-900 blur-xl dark:bg-gradient-to-r" />
    );
  };