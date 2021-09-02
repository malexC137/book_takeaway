import {useState, useEffect } from 'react';
import axios from "axios";
import styles from '../style/Book.module.css';
import SingleChapter from '../components/SingleChapter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import {v4 as uuidv4} from 'uuid';

function Book(props) {
    const [bookData, setBookData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chapterList, setChapterList] = useState([
        {id: uuidv4()}
    ])

    //Per gestire il caricamento dei dati
    useEffect(async () => {
        const bookId = props.match.params.id;
        const bookData = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        await setBookData(bookData.data.volumeInfo);
        setLoading(false);
    }, [])

    //Per renderizzare i capitoli
    const renderChapters = () => {
        const bookId = props.match.params.id;
        return chapterList.map((chapter, index) => {
            return <SingleChapter bookName={bookData.title} key={chapter.id} bookId={bookId} chapter={chapter} number={index + 1} />
        })
    }

    //Per aggiungere un nuovo capitolo
    const addChapter = () => {
        setChapterList([...chapterList, {id: uuidv4()}])
    }

    //Per renderizzare l'interfaccia
    return loading ? <p>Sta caricando...</p> : (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.textContainer}>
                    <h2>{bookData.title}</h2>
                    <p>{bookData.description}</p>
                    <h4>Autore: {bookData.authors }</h4>
                </div>
                <img className={styles.image} src={bookData.imageLinks.thumbnail} alt="" />
            </div>
            <div className={styles.chapterContainer}>
                {renderChapters()}
                <FontAwesomeIcon onClick={addChapter} style={{marginTop: '20px'}} size="3x" icon={faPlusSquare} />
            </div>
        </div>
    )
}

export default Book;