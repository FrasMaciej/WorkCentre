import { collections } from "../../../database/mongoConnection";

export async function addJob(req, res) {
    const job: JobDto = req.body.job;
    console.log(job);

    try {
        collections.jobs?.insertOne(job);
        return res.status(201);
    } catch (err) {
        console.error(err);
    }
}