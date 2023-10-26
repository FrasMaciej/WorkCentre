import { ObjectId } from "mongodb";
import { collections } from "../../../database/mongoConnection";

export async function addOrganization(req, res) {
    const organization: AddOrganizationDto = req.body.organization;
    const id = req.body.ownerId;

    try {
        const createdOrganization = await collections.organizations?.insertOne(organization);
        if (createdOrganization?.insertedId) {
            await collections.users?.updateOne({ _id: new ObjectId(id) }, { $push: { organizationsOwner: String(createdOrganization.insertedId) } });
            return res.status(201).json({ message: 'Job added successfully' });
        } else {
            return res.status(400).json({ message: 'Job creation failed' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function getOrganizations(req, res) {
    const organizations = await collections.organizations?.find().toArray();
    try {
        return res.json(organizations);
    } catch (err) {
        console.error(err);
    }
}

export async function getOrganizationsOwner(req, res) {
    const userId = req.params.id;

    try {
        const user = await collections.users?.findOne({ _id: new ObjectId(userId) });
        const ids = user?.organizationsOwner;

        if (ids && ids.length > 0) {
            const organizationsIds = ids.map(id => new ObjectId(id));
            const organizations = await collections.organizations?.find({ _id: { $in: organizationsIds } }).toArray();
            return res.json(organizations);
        } else {
            res.status(404).json();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json();
    }
}

