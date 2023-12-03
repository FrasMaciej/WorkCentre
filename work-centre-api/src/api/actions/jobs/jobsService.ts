import { ObjectId } from "mongodb";
import { collections } from "../../../database/mongoConnection";
import { StateType, states } from "../../../database/models/job/job";
import { addNotification } from "../notifications/notificationsService";
import { constants } from "../../../constants";
import OpenAI from 'openai';

export async function addJob(req, res) {
    const id = req.body.ownerId;
    const job = { ...req.body.job, author: id, applicants: [] };

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

export async function getJobsApplied(req, res) {
    const userId: string = req.params.id;

    try {
        if (userId) {
            const jobs = await collections.jobs?.find({ "applicants.id": { $in: [userId] } }).toArray();
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
        const updatedJob = await collections.jobs?.findOneAndUpdate({ _id: new ObjectId(dto.jobId) }, { $push: { applicants: { id: String(dto.applicantId), state: 'default' } } })
        const applicant = await collections.users?.findOne({ _id: new ObjectId(dto.applicantId) });
        if (updatedJob?.value?.author) {
            addNotification({
                title: "New application for your job offer",
                type: "new-applicant",
                content: `${applicant?.local.firstName} ${applicant?.local.lastName} has applied for your job offer: ${updatedJob.value.name}`,
                receiverId: updatedJob?.value?.author,
                sender: String(applicant?._id)
            });
            addNotification({
                title: "Application succesfull",
                type: "applied-for-offer",
                content: `You have succesfully applied for job offer: ${updatedJob.value.name}`,
                receiverId: String(applicant?._id),
                sender: updatedJob?.value?.author
            });
        }
        return res.json({}).status(200);
    } catch (err) {
        return err;
    }
}

export async function resignJob(req, res) {
    const dto: ApplyForJobDto = req.body.dto;
    try {
        await collections.jobs?.updateOne(
            { _id: new ObjectId(dto.jobId) },
            { $pull: { applicants: { id: String(dto.applicantId) } } }
        );
        return res.json({}).status(200);
    } catch (err) {
        return err;
    }
}

export async function getJobOfferApplicants(req, res) {
    const offerId = req.params.id;
    try {
        const job = await collections.jobs?.findOne({ _id: new ObjectId(offerId) });
        const applicantsList = job?.applicants.map(j => ({ id: new ObjectId(j.id), state: j.state }));
        const applicantsIds = job?.applicants.map(j => new ObjectId(j.id));
        const applicants = await collections.users?.find({ _id: { $in: applicantsIds } }).toArray();
        const mappedApplicants = applicants?.map(a => {
            const matchingApplicant = applicantsList?.find(applicant => String(applicant.id) === String(a._id));

            return {
                _id: a._id,
                email: a.local.email,
                firstName: a.local.firstName,
                lastName: a.local.lastName,
                headerInfo: a.profile.headerInfo,
                company: a.profile.company,
                skills: a.profile.skills,
                profileDescription: a.profile.profileDescription,
                experience: a.profile.experience,
                phone: a.profile.phone,
                state: matchingApplicant?.state,
                location: a.profile.location
            };
        });
        return res.json(mappedApplicants);
    } catch (err) {
        return err;
    }
}

export async function editState(req, res) {
    const dto: EditOfferStateDto = req.body;

    try {
        const job = await collections.jobs?.findOne({ _id: new ObjectId(dto.offerId) });

        if (job) {
            const applicantIndex = job.applicants.findIndex(applicant => applicant.id === dto.workerId);
            if (applicantIndex !== -1 && states.includes(dto.state)) {
                const state: StateType = dto.state as StateType;
                if (states.includes(dto.state)) {
                    job.applicants[applicantIndex].state = state;
                }

                const updatedJob = await collections.jobs?.findOneAndUpdate(
                    { _id: new ObjectId(dto.offerId) },
                    { $set: job }
                );
                if (updatedJob && updatedJob.value?.author) {
                    addNotification({
                        title: "Application state changed",
                        type: "application-status-changed",
                        content: `Your application status for offer ${updatedJob?.value?.name} has changed to: ${state}`,
                        receiverId: dto.workerId,
                        sender: updatedJob?.value?.author
                    });
                }

                res.status(200).json({ message: 'State updated successfully.' });
            } else {
                res.status(404).json({ message: 'Applicant not found in the job.' });
            }
        } else {
            res.status(404).json({ message: 'Job not found.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

export async function findBestCandidates(req, res) {
    const dto: BestCandidateMatchDto = req.body;
    const candidates = dto.candidates;
    const offer: JobDto = dto.offer
    const openai = new OpenAI({
        apiKey: constants.open_ai_key
    });

    try {
        const mappedOffer = { datils: offer.details, location: offer.location, name: offer.name, salary: offer.salary }
        const mappedCandidates = candidates.map(c => ({ experience: c.experience, headerInfo: c.headerInfo, description: c.profileDescription, skills: c.skills, location: c.location }))
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Choose one applicant that fits the best for job offer. Select the candidate whose skills and experience best match the requirements specified in the offer. 
                    Remember that one of the parameters cannot outweigh the others, you should choose a candidate whose all qualifications will be the best match to the job offer. 
                    One outstanding parameter cannot outweigh a candidate who meets most or all of the requirements at an average or good level. For example candidate with huge number of years of experience
                    with experience in language that is not connected with offer should not be the chosen one. For example, when in the offer, the advertiser is looking for .net developer, the developer
                    with experience in COBOL should not be good match.
                    So you have to play the role of an employer who is looking for the best employee. Do not include any explanations, 
                    only provide an index (starting from 0) of best fitting candidate, so the respose should be only a number. 
                    Job offer is: \n ${JSON.stringify(mappedOffer)}. \n Candidates are: \n ${JSON.stringify(mappedCandidates)}.`
                },
            ]
        });

        const bestMatchIndex = Number(response.choices[0].message.content);
        const bestMatchCandidate = candidates[bestMatchIndex];

        res.status(200).json(bestMatchCandidate);
    } catch (error) {
        console.error('Error while executing OpenAI API:', error);
        res.status(500).json({ error: 'An error occured while request execution.' });
    }
}
