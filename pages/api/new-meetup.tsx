import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { username, password } from '../../private/keys';

// /api/new-meetup
// POST --> /api/new-meetup

export const mongoUrl = 'mongodb://127.0.0.1:27017/meetups';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(mongoUrl);

    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    console.log(result);

    client.close();

    res.status(201).json({ message: 'meetup inserted' });
  }
};

export default handler;
