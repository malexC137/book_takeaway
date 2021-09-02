import styles from '../style/SingleChapter.module.css';
import { Link } from 'react-router-dom';

const SingleChapter = ({ number, bookId, bookName }) => {
    return (
        <Link 
        className={styles.container} 
        to={{
            pathname: `/book/${bookId}/chapter/${number}, 
            state: {
                libro:  bookName,
                capitolo: number,

            }`}}>
            <div>
                <p>Capitolo {number}</p>
            </div>
        </Link>
    )
}

export default SingleChapter;