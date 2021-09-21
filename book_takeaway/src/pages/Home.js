import { useState } from "react";
import styles from "../style/Searchbar.module.css";
import Results from "../components/Results";
import Message from "../components/Message";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBookData,
  addNewBook,
} from "../store/actions/handleBookData";

function App() {
  const [inputText, setInputText] = useState("");

  const data = useSelector(state => state.bookReducer.booksData);
  const savedIds = useSelector(state => state.bookReducer.savedIds);
  const error = useSelector(state => state.bookReducer.error);
  const loading = useSelector(state => state.bookReducer.loading);

  const dispatch = useDispatch();

  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  //Prendere i dati dei libri cercati dall'utente
  const fetchData = () => {
    dispatch(fetchBookData(inputText));
  };

  const addBook = async (doesExist, id, title, key) => {
    if (doesExist) {
      alert("Libro già salvato");
      return;
    }
    dispatch(addNewBook(id, title, key))
  };

  const showResults = () => {
    if (data.totalItems === 0) {
      return <Message error={true} message="Ricerca senza risultati." />;
    } else if (data.length === 0) {
      return <Message message="Cerca qualcosa..." />;
    } else {
      return loading ? (
        <Message message="Sto caricando..." />
      ) : (
        <Results
          error={error}
          loading={loading}
          addBook={addBook}
          savedIds={savedIds}
          data={data}
        />
      );
    }
  };

  return (
    <div className="App">
      <div className={styles.container}>
        <h1>Cerca un libro</h1>
        <div className={styles.formContainer}>
          <input
            value={inputText}
            onChange={handleInput}
            type="text"
            name=""
            id=""
          />
          <button onClick={fetchData}>Cerca</button>
        </div>
      </div>
      <h1 style={{ paddingLeft: "40px" }}>Risultati</h1>
      {showResults()}
    </div>
  );
}

export default App;
