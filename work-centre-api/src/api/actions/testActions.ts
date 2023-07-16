import { Request, Response } from 'express';

export async function test(req: Request, res: Response) {
    return res.status(200).json({ message: "Api Works :)" })
}
