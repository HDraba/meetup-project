import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { Meetup } from '../components/meetups/MeetupItem';
import MeetupList from '../components/meetups/MeetupList';

type HomePageProps = {
  meetups: Meetup[];
};
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
  return {
    props: { meetups: DUMMY_MEETUPS },
    revalidate: 10, // rerenders every x seconds when incoming requests are happening
  };
}

export default HomePage;
