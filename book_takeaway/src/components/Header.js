import styles from '../style/Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookReader, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <div className={styles.container}>
            <FontAwesomeIcon icon={faBookReader} size="2x" />
            <div className={styles.rightContainer}>
                <h2>I miei libri</h2>
                
                <a href="">
                    <FontAwesomeIcon icon={faPlusSquare} size="2x" />
                </a>
            </div>
        </div>
    )
}

export default Header;