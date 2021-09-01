import styles from '../style/SingleResult.module.css';

const SingleResult = ({title, description}) => {
    return (
        <div className={styles.container}>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default SingleResult;
