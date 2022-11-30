import MeetupItem, {Meetup} from './MeetupItem';
import classes from './MeetupList.module.css';

type MeetupList = {
  meetups: Meetup[]
}

function MeetupList(props: MeetupList) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup: Meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
