import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if(req.method !== 'POST' && req.method !== 'DELETE') {
        return res.status(405).end();
    }

    try {
        const { postId } = req.body;

        const { currentUser } = await serverAuth(req, res);

        if(!postId || typeof postId !== 'string'){
            throw new Error('Invalid ID');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });

        if(!post){
            throw new Error('Invalid ID')
        }

        let updateLikeIds = [...(post.likeIds || [])];

        if(req.method === 'POST'){
            updateLikeIds.push(currentUser.id);
        }

        if(req.method === 'DELETE'){
            updateLikeIds = updateLikeIds
            .filter((likeId) => likeId !== currentUser.id)
        }

        const updatePost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                likeIds: updateLikeIds
            }
        });

        return res.status(200).json(updatePost);
    } catch (error){
        console.log(error);
        return res.status(400).end();
    }
}