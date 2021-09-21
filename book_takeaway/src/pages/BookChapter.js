import { useState, useEffect } from 'react';
import styles from '../style/BookChapter.module.css';
import { firebase } from '../Axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTakeaways, fetchTakeawaysFail } from '../store/actions/handleBookTakeaways';

const BookChapter = (props) => {
    const [inputText, setInputText] = useState("");

    useEffect(() => {
        fetchBookTakeaways();
    }, [])

    const dispatch = useDispatch();
    const takeawayList = useSelector(state => state.takeawaysReducer.takeawaysList)
    const { libro, capitolo, chapterKey, bookKey } = props.location.state;

    const handleInputChange = (e) => {
        setInputText(e.target.value)
    }

    const fetchBookTakeaways = async () => {
        dispatch(fetchTakeaways(bookKey, chapterKey))
    }

    const pushNewTakeaways = async (e) => {
        e.preventDefault();
        try {
            const response = await firebase.put(`booksData/${bookKey}/chapters/${chapterKey}.json`, [...takeawayList, inputText]);
            await fetchBookTakeaways();
            console.log(response);
            setInputText("");
        } catch (error) {
            console.log(error)
        }
    }

    const renderTakeAways = () => {
        return takeawayList.map((takeaway, index) => {
            return <li key={index} >{takeaway}</li>
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