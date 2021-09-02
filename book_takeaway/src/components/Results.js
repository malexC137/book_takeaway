import styles from '../style/Results.module.css';
import SingleResult from './SingleResult';
import { Link } from 'react-router-dom';

const Results = ({ data }) => {
    console.log('dati:', data)
    const myData = data.items;
    const renderElement = () => {
        return myData.map((book) => {
            return (
                <Link key={book.id}  to={`book/${book.id}`}>
                    <SingleResult 
                    title={book.volumeInfo.title} 
                    image={book.volumeInfo.imageLinks} />
                </Link>
            )
        })
    }
    return (
        <div className={styles.container}>
            <div className={styles.resultsContainer}>
                {renderElement()}
            </div>
        </div>
    )
}

export default Results;