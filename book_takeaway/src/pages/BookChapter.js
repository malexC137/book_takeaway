import { useState, useEffect } from 'react';
import styles from '../style/BookChapter.module.css';
import axios from 'axios';
import { firebase } from '../Axios';

const BookChapter = (props) => {
    const [inputText, setInputText] = useState("");
    const [takeAwayList, setTakeawayList] = useState([]);

    useEffect(() => {
        fetchBookTakeaways();
    }, [])

    const { libro, capitolo, chapterKey, bookKey } = props.location.state;

    const handleInputChange = (e) => {
        setInputText(e.target.value)
    }

    const fetchBookTakeaways = async () => {
        try {
            const takeAwaysData = await firebase.get(`booksData/${bookKey}/chapters/${chapterKey}.json`);
            setTakeawayList(takeAwaysData.data);
        } catch (error) {
            console.log(error)
        }
    }

    const pushNewTakeaways = async (e) => {
        e.preventDefault();
        try {
            const response = await firebase.put(`booksData/${bookKey}/chapters/${chapterKey}.json`, [...takeAwayList, inputText]);
            await fetchBookTakeaways();
            console.log(response);
            setInputText("");
        } catch (error) {
            console.log(error)
        }
    }

    const renderTakeAways = () => {
        return takeAwayList.map((takeAway, index) => {
            return <li key={index} >{takeAway}</li>
        })
    }

    return (
        <div className={styles.container}>
            <h1>Titolo: {libro}</h1>
            <h2>Capitolo: {capitolo}</h2>
            <form onSubmit={pushNewTakeaways}>
                <p>Aggiungi Key takeaway</p>
                <input type="text" value={inputText} onChange={handleInputChange} />
            </form>
            <ol>
                {renderTakeAways()}
            </ol>
        </div>
    );
}

export default BookChapter;