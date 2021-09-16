import styles from '../style/SingleChapter.module.css';
import { Link } from 'react-router-dom';

const SingleChapter = ({ number, bookId, bookName, chapterKey, bookKey }) => {
    return (
        <Link
            className={styles.container}
            to={{
                pathname: `/book/${bookId}/chapter/${number}`,
                state: {
                    libro: bookName,
                    capitolo: number,
                    chapterKey: chapterKey,
                    bookKey: bookKey,
                }
            }}>
            <div>
                <p>Capitolo {number}</p>
            </div>
        </Link>
    )
}

export default SingleChapter;