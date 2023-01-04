// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {


  if (req.method === 'PUT') {
    const { emailAddress } = req.body;
    const emailAddressResp = await prisma.subscribeEmailList.upsert({
      where: {
        email: emailAddress,
      },
      update: {
        email: emailAddress,
      },
      create: {
        email: emailAddress,
      }
    });
    res.status(200).json(emailAddressResp);
  }
}
