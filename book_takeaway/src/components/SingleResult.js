import styles from '../style/SingleResult.module.css';

const SingleResult = ({ title, image }) => {
    const showTitle = () => {
        if (title.length < 20) {
            return title
        } else {
            return title.slice(0, 20) + ' ...';
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                    <h3 >{showTitle()}</h3>
            </div>
            <img src={image} alt=""
            />
        </div>
    )
}

export default SingleResult;
