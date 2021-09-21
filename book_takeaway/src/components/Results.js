import styles from '../style/Results.module.css';
import SingleResult from './SingleResult';

const Results = ({ data, savedIds, addBook, error, loading }) => {
    const renderElement = () => {
        const myData = data.items;
        return myData.map((book) => {
            const doesExist = savedIds.includes(book.id);
            return (
                <SingleResult
                    bookKey={book.id}
                    id={book.id}
                    error={error}
                    loading={loading}
                    addBook={addBook}
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