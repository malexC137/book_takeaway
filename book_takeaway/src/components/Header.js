import styles from '../style/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className={styles.container}>
            <Link to="/">
                <FontAwesomeIcon icon={faBookReader} size="2x" />
            </Link>
            <div className={styles.rightContainer}>
                <Link to="savedbooks">
                    <h2>I miei libri</h2>

                </Link>
                <a href="">
                    <FontAwesomeIcon icon={faPlusSquare} size="2x" />
                </a>
            </div>
        </div>
    )
}

export default Header;