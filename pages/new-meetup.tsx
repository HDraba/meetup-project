// domain.com/new-meetup

import { useRouter } from 'next/router';
import { Meetup } from '../components/meetups/MeetupItem';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

const NewMeetup = () => {
  const router = useRouter()
  
    const addMeetupHandler = async (enteredMeetupData: Meetup) => {
    
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json()
    console.log('returned data: ', data);
    router.replace('/')
  };

  return (
    <>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetup;
