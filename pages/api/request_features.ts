// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'POST') {
        const { featureDesc, email, ratingVal } = req.body;
        const submitRequestFeaturesResp = await prisma.requestFeatures.create({
            data: {
                app_review: featureDesc,
                email: email,
                rating: ratingVal,
            }
        });
        res.status(200).json(submitRequestFeaturesResp);
    }
}
