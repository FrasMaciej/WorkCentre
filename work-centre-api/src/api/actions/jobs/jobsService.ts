import { collections } from "../../../database/mongoConnection";

export async function addJob(req, res) {
    const job: JobDto = req.body.job;

    try {
        await collections.jobs?.insertOne(job);
        return res.status(201);
    } catch (err) {
        console.error(err);
    }
}

export async function getJobs(req, res) {
    const jobs = await collections.jobs?.find().toArray();
    try {
        return res.json(jobs);
    } catch (err) {
        console.error(err);
    }
}