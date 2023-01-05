// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../utility/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {


  if (req.method === 'PUT') {
    const { emailAddress } = req.body;
    const { data, error } = await supabase.from('profiles').select('*');
    console.log(data);
  }
}
