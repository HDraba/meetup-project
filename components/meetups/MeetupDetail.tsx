
import styles from './MeetupDetail.module.css'

type MeetupDetailProps = {
    imgUrl: string,
    title: string,
    address: string,
    description: string
}

const MeetupDetail = (props: MeetupDetailProps) => {
    return (
    <section className={styles.detail}>
        <img src={props.imgUrl} alt={props.title} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>)
}

export default MeetupDetail