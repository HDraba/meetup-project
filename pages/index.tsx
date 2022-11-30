import Layout from '../components/layout/Layout';
import { Meetup } from '../components/meetups/MeetupItem';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import { password, username } from '../private/keys';
import { mongoUrl } from './api/new-meetup';

type HomePageProps = {
  meetups: Meetup[];
};

type MappedMeetup = Meetup & { description: string };

const DUMMY_MEETUPS: Meetup[] = [
  {
    id: 'm1',
    title: 'meetup1',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
    address: 'here',
    // description: 'some desc'
  },
  {
    id: 'm2',
    title: 'meetup2',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
    address: 'also here',
    // description: 'some desc'
  },
];

const HomePage = (props: HomePageProps) => {
  return (
    <>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// runs on the server
// runs for every incoming request
// export async function getServerSideProps (context) {
// const req = context.req
// const res = context.res
//
// return {
// props: {
// meetups: DUMMY_MEETUPS
// }
// }
// }

// can executed code that normally runs on the server
// executed during the build process, so it is never on the client-side

export async function getStaticProps() {
  const client = await MongoClient.connect(
    // `mongodb+srv://${username}:${password}@finaltrycluster.dcie8yz.mongodb.net/meetups?retryWrites=true&w=majority`
    // 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0'
    mongoUrl
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup: any) => {
        return {
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          id: meetup._id.toString(),
        };
      }),
    },
    revalidate: 1, // rerenders every x seconds when incoming requests are happening
  };
}

export default HomePage;
