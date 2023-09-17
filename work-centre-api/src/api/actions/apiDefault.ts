import { Response } from 'express';

export async function apiDefault(req, res: Response) {
    return res.json('Work Centre server is listening for requests')
}
