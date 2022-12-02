// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    const subscribeEmailList = await prisma.subscribeEmailList.findMany();
    res.status(200).json(subscribeEmailList)
  }

  if (req.method === 'POST') {
    const { emailAddress } = req.body;
    const emailAddressResp = await prisma.subscribeEmailList.create({
      data: {
        email: emailAddress,
      },
    });
    res.status(200).json(emailAddressResp);
  }
}
