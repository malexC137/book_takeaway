import styles from '../style/BookChapter.module.css'

const BookChapter = (props) => {
    console.log(props)
    return (
        <div className={styles.container}>
            <h1>{props.location.state.libro}</h1>
        </div>
    )
}

export default BookChapter;