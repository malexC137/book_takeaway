import { useState, useEffect } from 'react';
import { googleBooks } from "../Axios";
import styles from '../style/Book.module.css';
import { v4 as uuidv4 } from 'uuid';
import SingleChapter from '../components/SingleChapter';
import axios from 'axios';
import { firebase } from '../Axios';


function Book(props) {
    const [bookData, setBookData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [inputText, setInputText] = useState("");
    const [chapterList, setChapterList] = useState([
        { id: uuidv4() }
    ])

    //Per gestire il caricamento dei dati
    const bookId = props.match.params.id;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const bookData = await googleBooks.get(`${bookId}`);
                setBookData(bookData.data.volumeInfo);
                await fetchChaptersData();
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [bookId]);

    //Per renderizzare i capitoli
    const renderChapters = () => {
        const bookId = props.match.params.id;
        const bookKey = props.location.state.bookKey;
        console.log(bookId);
        return chapterList.map((key, index) => {
            return (
                <SingleChapter
                    bookName={bookData.title}
                    key={key}
                    chapterKey={key}
                    bookKey={bookKey}
                    bookId={bookId}
                    chapter={4}
                    number={index + 1}
                />
            );
        });
    };

    const handleInputChange = (e) => {
        setInputText(e.target.value)
    }

    const createNewChapter = async (e) => {
        e.preventDefault();
        const bookKey = props.location.state.bookKey;
        try {
            const response = await firebase.post(`booksData/${bookKey}/chapters.json`, [inputText]);
            const newChapterList = [...chapterList, response.data.name];
            setChapterList(newChapterList);
            setInputText("");
        } catch (error) {
            console.log(error)
        }
    }

    const fetchChaptersData = async () => {
        const bookKey = props.location.state.bookKey;
        try {
            const response = await firebase.get(`booksData/${bookKey}/chapters.json`);
            const myData = await response.data;
            const chaptersList = [];
            for (let key in myData) {
                chaptersList.push(key)
            }
            setChapterList(chaptersList);
        } catch (error) {
            console.log(error)
        }
    }

    const nextChapterNumber = chapterList.length + 1;

    //Per renderizzare l'interfaccia
    return loading ? (<p>Sta caricando...</p>) : (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.textContainer}>
                    <h2>{bookData.title}</h2>
                    <p>{bookData.description}</p>
                    <h4>Autore: {bookData.authors}</h4>
                </div>
                <img className={styles.image} src={bookData.imageLinks.thumbnail} alt="" />
            </div>
            <div className={styles.chapterContainer}>
                {renderChapters()}
                {/* <FontAwesomeIcon
                    onClick={createNewChapter}
                    style={{ marginTop: '20px' }}
                    size="3x"
                    icon={faPlusSquare}
                /> */}
                <form onSubmit={createNewChapter} style={{ width: '100%' }}>
                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder={`Aggiungi takeaway al capitolo ${nextChapterNumber}`} />
                </form>
            </div>
        </div>
    );
}

export default Book;