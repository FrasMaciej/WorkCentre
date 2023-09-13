import { Request, Response } from 'express';
import { collections } from "../../database/mongoConnection";

export async function test(req: Request, res: Response) {
    return res.status(200).json({ message: "Api Works :)" })
}

export async function test2(req, res: Response) {
    if (req.isAuthenticated()) {
        const val = await collections.users?.find({})
        return res.json({ message: "Api Works2 :)", ms: val })
    } else {
        return res.json({ message: 'You are not authenticated' })
    }
}
