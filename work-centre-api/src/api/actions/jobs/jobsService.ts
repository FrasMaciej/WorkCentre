import { ObjectId } from "mongodb";
import { collections } from "../../../database/mongoConnection";

export async function addJob(req, res) {
    const job: JobDto = { ...req.body.job };
    const id = req.body.ownerId;

    try {
        const createdJob = await collections.jobs?.insertOne(job);
        console.log(createdJob);
        if (createdJob?.insertedId) {
            try {
                await collections.users?.updateOne({ _id: new ObjectId(id) }, { $push: { jobsAuthor: String(createdJob.insertedId) } });
                return res.status(201);
            } catch (err) {
                return res.status(400);
            }
        } else {
            return res.status(400).send('Job creation failed');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
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

export async function getJobsAuthor(req, res) {
    const userId = req.params.id;

    try {
        const user = await collections.users?.findOne({ _id: new ObjectId(userId) });
        const ids = user?.jobsAuthor;

        if (ids && ids.length > 0) {
            const jobIds = ids.map(id => new ObjectId(id));
            const jobs = await collections.jobs?.find({ _id: { $in: jobIds } }).toArray();
            return res.json(jobs);
        } else {
            res.status(404).json();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json();
    }
}