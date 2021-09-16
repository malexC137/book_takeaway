import { useState } from 'react';
import styles from '../style/SingleResult.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import {firebase} from '../Axios';


const SingleResult = ({ title, image, id, doesExist, key }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const showTitle = () => {
        if (title.length < 20) {
            return title
        } else {
            return title.slice(0, 20) + ' ...';
        }
    }

    console.log('Libro già esistente?', doesExist )
    // METODO TRY CATCH
    // const addBook = () => {
    //     setLoading(true);
    //     setError(false);
    //     axios.post('https://booktakeaway-9ddeb-default-rtdb.europe-west1.firebasedatabase.app/booksData.json', {
    //         bookId: id
    //     }).then(response => {
    //         console.log(response);
    //         setLoading(false);
    //         setError(false);
    //     })
    //         .catch(error => {
    //             console.log(error);
    //             setLoading(false);
    //             setError(true);
    //         });
    // }

    // METODO ASYNC AWAIT
    const addBook = async () => {
        if (doesExist) {
            alert('Libro già salvato')
            return
        }
        try {
            const data = await firebase.post('booksData.json',
                {
                    bookId: id,
                    bookTitle: title,
                    bookKey: key,
                }
            );
            console.log(data);
            setLoading(false);
            setError(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    };

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
                        <FontAwesomeIcon onClick={addBook} icon={faPlusSquare} size="2x" style={{color: buttonColor}} />
                        {error ? <p>Errore di Network</p> : null}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SingleResult;
