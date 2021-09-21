import { useState, useEffect } from "react";
import { googleBooks } from "../Axios";
import styles from "../style/Book.module.css";
import SingleChapter from "../components/SingleChapter";
import { fetchChaptersData, createNewChapter } from "../store/actions/handleBookChapter";
import { useSelector, useDispatch } from "react-redux";

function Book(props) {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
//   const [chapterList, setChapterList] = useState([]);

  const dispatch = useDispatch();
  const chapterList = useSelector(state => state.chapterReducer.chaptersList)

  //Per gestire il caricamento dei dati
  const bookId = props.match.params.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await googleBooks.get(`${bookId}`);
        setBookData(bookData.data.volumeInfo);
        await fetchChapters();
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
    setInputText(e.target.value);
  };

  const handleNewChapter = async (e) => {
    e.preventDefault();
    const bookKey = props.location.state.bookKey;
    dispatch(createNewChapter(bookKey, inputText));
    setInputText("");
  };

  const fetchChapters = async () => {
    const bookKey = props.location.state.bookKey;
    dispatch(fetchChaptersData(bookKey));
  };

  const nextChapterNumber = chapterList.length + 1;

  //Per renderizzare l'interfaccia
  return loading ? (
    <p>Sta caricando...</p>
  ) : (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h2>{bookData.title}</h2>
          <p>{bookData.description}</p>
          <h4>Autore: {bookData.authors}</h4>
        </div>
        <img
          className={styles.image}
          src={bookData.imageLinks.thumbnail}
          alt=""
        />
      </div>
      <div className={styles.chapterContainer}>
        {renderChapters()}
        <form onSubmit={handleNewChapter} style={{ width: "100%" }}>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder={`Aggiungi takeaway al capitolo ${nextChapterNumber}`}
          />
        </form>
      </div>
    </div>
  );
}

export default Book;
