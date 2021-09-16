import { useEffect, useState } from 'react';
import { firebase } from '../Axios';
import styles from '../style/Results.module.css';
import SingleResult from './SingleResult';

const Results = ({ data }) => {
    const [savedIds, setSavedIds] = useState([]);
    // console.log('dati:', data)
    const myData = data.items;

    //1. Prendere l' id dei libri salvati su Firebase
    //2. Prendere l'id dei libri cercati
    //3. Confrontare i due id e vedere se combaciano
    useEffect(() => {
        getSavedBooksId();
    }, [])

    const getSavedBooksId = async () => {
        try {
            const response = await firebase.get('booksData.json');
            const data = response.data;
            // console.log('Data dal merda di firebase', data);
            const allIds = [];
            for (let key in data) {
                allIds.push(data[key].bookId)
            }
            await setSavedIds(allIds);
            // console.log('id salvati a cazzo di cane', savedIds )
        } catch (error) {
            console.log(error)
        }
    }

    const renderElement = () => {
        return myData.map((book) => {
            const doesExist = savedIds.includes(book.id);
            return (
                <SingleResult
                    bookKey={book.id}
                    id={book.id}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    doesExist={doesExist}
                    title={book.volumeInfo.title}
                     />
            );
        });
    };
    return (
        <div className={styles.container}>
            <div className={styles.resultsContainer}>
                {renderElement()}
            </div>
        </div>
    );
};

export default Results;