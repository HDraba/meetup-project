import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import MeetupDetail from '../components/meetups/MeetupDetail';
import { Meetup } from '../components/meetups/MeetupItem';
import { Collection, Db, MongoClient, ObjectId } from 'mongodb';
import { mongoUrl } from './api/new-meetup';

type MeetupDetailsProps = {
  meetupData: Meetup & { description: string };
};

type MeetupsCollection = {
  _id: object;
  title: string;
  image: string;
  description: string;
};

const MeetupDetails = (props: MeetupDetailsProps) => {
  return (
    <>
      <MeetupDetail
        imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153"
        title="some first meetup"
        address="some sddress"
        description="desc"
      />
    </>
  );
};

// why?: every variation of this site has to be prerendered, so we have to provide every variation via the paths array
export async function getStaticPaths() {
  // connecting to local db
  const client = await MongoClient.connect(mongoUrl);
  const db: Db = client.db();
  const meetupsCollection: Collection<MeetupsCollection> =
    db.collection('meetups');

  const meetupIds: any = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();

  client.close();

  return {
    fallback: false,
    paths: meetupIds.map((meetupId: any) => {
      // meetupId should be of type { _id: new ObjectId(wlkedfldlkfblgvdcfvgbn)}
      console.log('display the meetupId: ', meetupId);
      return {
        params: {
          meetupId: meetupId._id.toString(),
        },
      };
    }),
  };
}
 
// have to use getStaticPaths as well when using getStaticProps and a dynamic page
export async function getStaticProps<GetStaticProps>(
  context: GetStaticPropsContext
) {
  const meetupId = context.params!.meetupId;

  const client = await MongoClient.connect(mongoUrl);
  const db: Db = client.db();
  const meetupsCollection: Collection<MeetupsCollection> =
    db.collection('meetups');

  const query = { _id: meetupId };
  const selectedMeetup = meetupsCollection.findOne(query);

  client.close();

  return {
    props: {
      meetupData: {
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
        id: { meetupId },
        title: 'some first meetup',
        address: 'some street, 55555 city',
        description: 'descriptive',
      },
    },
  };
}

export default MeetupDetails;
