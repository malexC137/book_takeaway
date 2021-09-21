import { useEffect } from "react";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSavedBooks } from "../store/actions/handleBookData";

function SavedBooks() {
  const bookData = useSelector(state => state.bookReducer.savedBooks);
  const loading = useSelector(state => state.bookReducer.loading);
  const error = useSelector(state => state.bookReducer.error);

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchSavedBooks());
  }, []); 

  const renderBookItem = (book) => {
    return (
      <div
        key={book.id}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
          backgroundColor: "blue",
        }}
      >
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: `book/${book.id}`,
            state: {
              bookKey: book.key,
            },
          }}
        >
          <p style={{ color: "white" }}>{book.title}</p>
        </Link>
      </div>
    );
  };

  const renderListBooks = () => {
    return bookData.map((item) => {
      return renderBookItem(item);
    });
  };

  return (
    <div>
      <h1>I miei cazzo di libbri</h1>
      {error ? (
        <Message message="Errore di network" error />
      ) : loading ? (
        <Message message="Sto caricando..." />
      ) : (
        renderListBooks()
      )}
    </div>
  );
}

export default SavedBooks;
