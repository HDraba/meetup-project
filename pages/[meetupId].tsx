import { GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import MeetupDetail from '../components/meetups/MeetupDetail';
import { Meetup } from '../components/meetups/MeetupItem';

type MeetupDetailsProps = {
  meetupData: Meetup & { description: string };
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
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
  };
}

// have to use getStaticPaths as well when using getStaticProps and a dynamic page
export async function getStaticProps<GetStaticProps>(
  context: GetStaticPropsContext
) {
  const meetupId = context.params!.meetupId;
  
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
