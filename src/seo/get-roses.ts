import { Metadata } from "next";
import { headers } from "next/headers";
import { IGetLinkDetailsResponse } from "@/types";
import { getLinkDetails } from "@squirrel-labs/peanut-sdk";

type Props = {
  searchParams: {
    v?: string;
    l?: string;
    chain?: string;
  };
};

async function getRoseDetails(
  linkCode: string
): Promise<IGetLinkDetailsResponse> {
  try {
    const details = await getLinkDetails({ link: linkCode });
    return details as unknown as IGetLinkDetailsResponse;
  } catch (error) {
    console.error("Error fetching rose details:", error);
    throw error;
  }
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const headersList = await headers();
  const origin = headersList.get("origin") || "";
  const baseUrl = origin.startsWith("https")
    ? process.env.NEXT_PUBLIC_MAINNET_URL
    : process.env.NEXT_PUBLIC_TESTNET_URL;

  try {
    const linkCode = searchParams.l;
    if (!linkCode) throw new Error("No rose code provided");

    const details = await getRoseDetails(linkCode);

    const roseCount = details.tokenAmount?.toString() ?? "1";
    const chain = searchParams.chain ?? "1";

    const ogImageUrl = `${baseUrl}/api/og/love?roses=${encodeURIComponent(
      roseCount
    )}&chain=${encodeURIComponent(chain)}`;

    const title = `Receive ${roseCount} ${roseCount === "1" ? "Rose" : "Roses"} from Your Secret Admirer`;
    const description = `Someone sent you ${roseCount} beautiful pixelated ${
      roseCount === "1" ? "rose" : "roses"
    }. Claim your digital bouquet now in this Valentine's crypto surprise!`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [{ url: ogImageUrl }],
        url: `${baseUrl}/love`,
        siteName: "AI Valentines | Cringy Cupid",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImageUrl],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    const fallbackTitle = "Receive a Mysterious Pixelated Rose";
    const fallbackDescription = "Someone wants to send you a special digital Valentine's surprise. Claim your pixelated rose now and find out who it is!";
    const fallbackImage = `${baseUrl}/images/pixel-rose.png`;

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      openGraph: {
        title: fallbackTitle,
        description: fallbackDescription,
        images: [{ url: fallbackImage }],
        url: `${baseUrl}/love`,
        siteName: "AI Valentines | Cringy Cupid",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: fallbackTitle,
        description: fallbackDescription,
        images: [fallbackImage],
      },
    };
  }
}