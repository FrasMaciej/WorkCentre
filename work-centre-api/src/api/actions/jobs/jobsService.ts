import { ObjectId } from "mongodb";
import { collections } from "../../../database/mongoConnection";

export async function addJob(req, res) {
    const id = req.body.ownerId;
    const job: JobDto = { ...req.body.job, author: id };

    try {
        const createdJob = await collections.jobs?.insertOne(job);
        if (createdJob?.insertedId) {
            try {
                await collections.users?.updateOne({ _id: new ObjectId(id) }, { $push: { jobsAuthor: String(createdJob.insertedId) } });
                return res.status(201).json({});
            } catch (err) {
                return res.status(400).json({});
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

export async function getJob(req, res) {
    const id = req.params.id;
    const job = await collections.jobs?.findOne({ _id: new ObjectId(id) })
    try {
        return res.json(job);
    } catch (err) {
        console.error(err);
    }
}

export async function removeJob(req, res) {
    const id = req.params.id;
    try {
        await collections.jobs?.deleteOne({ _id: new ObjectId(id) });
        return res.status(200).json();
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

export async function applyJob(req, res) {
    const dto: ApplyForJobDto = req.body.dto;
    try {
        await collections.jobs?.updateOne({ _id: new ObjectId(dto.jobId) }, { $push: { applicantsIds: String(dto.applicantId) } })
        return res.json({}).status(200);
    } catch (err) {
        return err;
    }
}

export async function resignJob(req, res) {
    const dto: ApplyForJobDto = req.body.dto;
    try {
        await collections.jobs?.updateOne({ _id: new ObjectId(dto.jobId) }, { $pull: { applicantsIds: String(dto.applicantId) } })
        return res.json({}).status(200);
    } catch (err) {
        return err;
    }
}