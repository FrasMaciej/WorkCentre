import { Request, Response } from 'express';

export async function test(req: Request, res: Response) {
    return res.status(200).json({ message: "Api Works :)" })
}

export async function test2(req: Request, res: Response) {
    return res.status(200).json({ message: "Api Works2 :)" })
}
