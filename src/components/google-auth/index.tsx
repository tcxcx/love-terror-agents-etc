"use client";

import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";
import { useSearchParams, usePathname } from "next/navigation";
import supabase from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";

export function GoogleSignin() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const returnTo = searchParams.get("return_to");
  const baseUrl =
    process.env.NEXT_PUBLIC_TESTNET_URL ||
    window.location.origin ||
    "http://localhost:3000";

  const handleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);

      // Get current path
      const currentPath = pathname;
      const isGameOrLove = currentPath.startsWith('/game') || currentPath.startsWith('/love');

      const redirectTo = new URL(
        "/api/auth/callback",
        window.location.origin || baseUrl
      );

      // If we're on game or love pages, redirect back to current URL
      if (isGameOrLove) {
        redirectTo.searchParams.append("return_to", window.location.href);
      } else if (returnTo) {
        redirectTo.searchParams.append("return_to", returnTo);
      }

      const { data, error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectTo.toString(),
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (!data) {
        setError("No response received from authentication provider");
        return;
      }

      console.log("authData returned", data);

      if (signInError) {
        console.error("Sign-in error:", signInError);
        setError(signInError.message);
        return;
      }
    } catch (err) {
      console.error("Unexpected error during sign-in:", err);
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2 font-futuru font-light mx-10">
      <Button
        onClick={handleSignIn}
        variant="outline"
        className="w-full bg-whiteDanis border-transparent py-2 hover:bg-violetDanis transition-all duration-300  hover:backdrop-blur-xl"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            <FcGoogle className="mr-2 size-5" />
            Sign in with Google
          </>
        )}
      </Button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
