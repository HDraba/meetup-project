import MeetupDetail from '../components/meetups/MeetupDetail';

const MeetupDetails = () => {
  return (
    <>
      <MeetupDetail
        imgUrl="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1600px-Stadtbild_M%C3%BCnchen.jpg?20130611211153"
        title="some first meetup"
        address="some street 4, 55555 city"
        description="description, yeah descriptive"
      />
    </>
  );
};

export default MeetupDetails;
