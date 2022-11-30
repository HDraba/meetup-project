// domain.com/new-meetup

import { Meetup } from "../components/meetups/MeetupItem";
import NewMeetupForm from "../components/meetups/NewMeetupForm"

const NewMeetup = () => {
    const addMeetupHandler = (enteredMeetupData: Meetup) => {
    console.log(enteredMeetupData);
    
    }

  return (
    <>
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  )
}

export default NewMeetup