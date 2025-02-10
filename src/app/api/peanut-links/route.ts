import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { roseId, link } = await request.json();

    const { data, error } = await supabase
      .from('peanut_links')
      .insert([{
        rose_id: roseId,
        link: link,
        claimed: false,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Error creating peanut link' }, { status: 500 });
    }

    // Update the rose record with the peanut link
    const { error: roseError } = await supabase
      .from('roses')
      .update({ peanut_link: link })
      .eq('id', roseId);

    if (roseError) {
      return NextResponse.json({ error: 'Error updating rose with peanut link' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { linkId, walletAddress } = await request.json();

    // Update peanut link status
    const { data: peanutLink, error: peanutError } = await supabase
      .from('peanut_links')
      .update({
        claimed: true,
        claimed_at: new Date().toISOString(),
        claimed_by: walletAddress
      })
      .eq('id', linkId)
      .select()
      .single();

    if (peanutError) {
      return NextResponse.json({ error: 'Error updating peanut link' }, { status: 500 });
    }

    // Update associated rose status
    const { error: roseError } = await supabase
      .from('roses')
      .update({
        claimed: true,
        claimed_at: new Date().toISOString(),
        claimed_by_wallet: walletAddress
      })
      .eq('id', peanutLink.rose_id);

    if (roseError) {
      return NextResponse.json({ error: 'Error updating rose status' }, { status: 500 });
    }

    return NextResponse.json(peanutLink);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}