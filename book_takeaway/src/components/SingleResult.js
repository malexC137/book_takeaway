import styles from '../style/SingleResult.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';


const SingleResult = ({ title, image, id, doesExist, key, addBook, error, loading }) => { 

    const showTitle = () => {
        if (title.length < 20) {
            return title
        } else {
            return title.slice(0, 20) + ' ...';
        }
    }
    const buttonColor = doesExist ? 'grey' : 'blueviolet'; 

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Link to={{
                    pathname: `book/${id}`,
                    state: {
                        bookKey: key,
                    }
                }}>
                    <h3 >{showTitle()}</h3>
                </Link>
            </div>
            <img src={image} alt=""
            />
            <div className={styles.buttonContainer}>
                {loading ? (
                    <Spinner />
                ) : (
                    <div>
                        <FontAwesomeIcon onClick={() => addBook(doesExist, id, title, key)} icon={faPlusSquare} size="2x" style={{color: buttonColor}} />
                        {error ? <p>Errore di Network</p> : null}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SingleResult;
