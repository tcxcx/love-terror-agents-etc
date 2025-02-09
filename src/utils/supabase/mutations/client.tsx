import { Rose, PeanutLink } from '@/types';

export async function createRoseSubmission(roseData: Omit<Rose, 'id' | 'created_at' | 'claimed'>): Promise<Rose | null> {
  try {
    const response = await fetch('/api/roses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(roseData),
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

export async function createPeanutLink(roseId: string, link: string): Promise<PeanutLink | null> {
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