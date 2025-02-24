import { Rose, PeanutLink } from "@/types";

export async function createRoseSubmission(
  roseData: any
): Promise<Rose | null> {
  try {
    console.log(roseData, "roseData");
    const response = await fetch("/api/roses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...roseData,
        valentines_name: roseData.valentines_name,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  } catch (error) {
    console.error("Error creating rose submission:", error);
    return null;
  }
}

export async function createPeanutLink(
  roseId: string,
  link: string,
  claimWallet: string,
  claimStatus: boolean
): Promise<PeanutLink | null> {
  try {
    const response = await fetch("/api/peanut-links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roseId, link, claimWallet, claimStatus }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  } catch (error) {
    console.error("Error creating peanut link:", error);
    return null;
  }
}

export async function updatePeanutLink(
  link: string,
  claimed_wallet: string,
  claimed: boolean
): Promise<PeanutLink | null> {
  try {
    const response = await fetch("/api/peanut-links", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link, claimed_wallet, claimed }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  } catch (error) {
    console.error("Error creating peanut link:", error);
    return null;
  }
}

export async function claimPeanutLink(
  linkId: string,
  walletAddress: string
): Promise<PeanutLink | null> {
  try {
    const response = await fetch("/api/peanut-links", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ linkId, walletAddress }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  } catch (error) {
    console.error("Error claiming peanut link:", error);
    return null;
  }
}
