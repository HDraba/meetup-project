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
  address?: string;
};

const MeetupDetails = (props: MeetupDetailsProps) => {
  return (
    <>
      <MeetupDetail
        imgUrl={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
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
  const meetupId = context.params!.meetupId!;
  const stringId = meetupId.toString();

  const client = await MongoClient.connect(mongoUrl);
  const db: Db = client.db();
  const meetupsCollection: Collection<MeetupsCollection> =
    db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(stringId),
  });

  client.close();

  return {
    props: {
      // meetupData: JSON.parse(JSON.stringify(selectedMeetup)),
      meetupData: {
        id: selectedMeetup?._id,
        image: selectedMeetup?.image,
        title: selectedMeetup?.title,
        address: selectedMeetup?.address
      }
    },
  };
}

export default MeetupDetails;
