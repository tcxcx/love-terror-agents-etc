import { Rose, PeanutLink } from '@/types';

export async function createRoseSubmission(roseData: Omit<Rose, 'id' | 'created_at' | 'claimed'>): Promise<Rose | null> {
  try {
    // First create valentines_user if wallet provided
    const response = await fetch('/api/roses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...roseData,
        valentines_name: roseData.valentines_name
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  } catch (error) {
    console.error('Error creating rose submission:', error);
    return null;
  }
}

export async function createPeanutLink(
  roseId: string, 
  link: string
): Promise<PeanutLink | null> {
  try {
    const response = await fetch('/api/peanut-links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ roseId, link }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  } catch (error) {
    console.error('Error creating peanut link:', error);
    return null;
  }
}

export async function claimPeanutLink(
  linkId: string,
  walletAddress: string
): Promise<PeanutLink | null> {
  try {
    const response = await fetch('/api/peanut-links', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ linkId, walletAddress }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return response.json();
  } catch (error) {
    console.error('Error claiming peanut link:', error);
    return null;
  }
}