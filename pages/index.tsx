import Layout from '../components/layout/Layout';
import { Meetup } from '../components/meetups/MeetupItem';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS: Meetup[] = [{
    id: 'm1',
    title: 'meetup1',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
    address: 'here',
    // description: 'some desc'
}, {
    id: 'm2',
    title: 'meetup2',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153',
    address: 'also here',
    // description: 'some desc'
}]

const HomePage = () => {
  return (
    <>
      <MeetupList meetups={DUMMY_MEETUPS}/>
    </>
  );
};

export default HomePage;
